

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import ReadOnlyStarsRating from './ReadOnlyStarsRating';

const ProductDetail = (props) => {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [product, setProduct] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [activeImg, setActiveImg] = useState('https://www.ivsauto.ca/frontend/assets/images/placeholder/inventory-full-placeholder.png');
  
  useEffect(() => {
    db.collection('products').doc(id).onSnapshot(doc => {
      setProduct(doc.data());
      setSelectedProduct({name: doc.data().name, cartImg: doc.data().images[0], id: id, quantity: 1});
      getLargeImg(0)
    })
    
      db.collection('users').doc(auth.currentUser.uid).collection('wishlist').doc(id).get().then(doc => {
        if(doc.data() !== undefined) setWishlist(doc.data().wishlist)
        else setWishlist(false)
      })
  }, []);

  
  useEffect (() => {
    db.collection('products').doc(id).collection('reviews').onSnapshot(doc => {
      let tempReviews = [];
      doc.forEach(review => {
        tempReviews.push(review.data().rating);
      })
      
      db.collection('products').doc(id).update({
        averageRating: tempReviews.length ? (tempReviews.reduce((a, b) => a + b, 0) / tempReviews.length).toFixed(1) : 0,
      })
    })
  }, [])

  const getLargeImg = (num) => {
    let allImagesContainer = document.querySelector('.PD-all-images');
    allImagesContainer.querySelectorAll('.PD-all-images li').forEach(element => {
      element.classList.remove('selected-product-img');
    });  
    
    if(allImagesContainer.querySelectorAll('li img').length > 0) {
      allImagesContainer.querySelectorAll('li')[num].classList.toggle('selected-product-img')
      setActiveImg(allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').replace("-r.jpg", "-z.jpg"));
    }
  }

  const setPrice = (index) => {
    setSelectedProduct(prevInputs => ({...prevInputs, ['price']: product.prices[index] }));
    setSelectedProduct(prevInputs => ({...prevInputs, ['size']: product.dimensions[index] }));
    
    document.querySelectorAll('.PD-sizes-container li').forEach(element => {
      element.classList.remove('price-selected');
    });
    document.querySelector('.PD-cost').textContent = `$${product.prices[index]}`;
    document.querySelectorAll('.PD-sizes-container li')[index].classList.add('price-selected');
  }

  const updateField = (e) => {
    e.persist();
    setSelectedProduct(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }
  
  const onAddWishlist = () => {
    setWishlist(!wishlist);
    db.collection('users').doc(auth.currentUser.uid).collection('wishlist').doc(id).set({
      wishlist: !wishlist,
      productId: id,
      name: product.name,
      img: product.images[0],
      price: `${Math.min(...product.prices)} - ${Math.max(...product.prices)}`,
    })
  }

  return (
    <>  
      {product &&
        <>
          <div className="history-redirect-links"> 
            <Link to={"/"}>Home</Link>
            <i class="bi bi-chevron-right"></i> 
            <Link to={"/results"}>Products</Link>
            <i class="bi bi-chevron-right"></i> 
            {product.name}
          </div>
          <section className="product-detail-container">
            <div className="PD-img-container">
              <ul className="PD-all-images">
                {product.images.map((img, index) =>
                  <li key={index} onClick={() => getLargeImg(index)}><img src={img}/></li>
                )}
              </ul>
              <div className="PD-default-img-container">
                {wishlist ? 
                  <AiFillHeart onClick={onAddWishlist} style={{position: 'absolute', top: '50px', left: '50px'}} size={50} color={'rgb(202, 89, 89)'}/>: 
                  <AiOutlineHeart onClick={onAddWishlist} style={{position: 'absolute', top: '50px', left: '50px'}} size={50} color={'white'}/>
                 }
                <img src={activeImg}/>
              </div>
            </div>
            <div className="PD-options-container">
              <h2 className="PD-title">{product.name}</h2>
              <div className="ml-3" style={{display: 'flex', alignItems: 'center'}}><ReadOnlyStarsRating rating={Math.round(product.averageRating)} size={20}/><span className="ml-4" style={{fontSize: "1.1rem"}}>{product.averageRating ? `${product.averageRating}/5.0`: "No reviews"}</span></div>
              <h5 className="PD-select-size">Select Size:</h5>
              <ul className="PD-sizes-container">
                {product.dimensions.map((size, index) =>
                  <li key={index} onClick={() => setPrice(index)}>{size}</li>
                )}
              </ul>
              <div className="PD-cost">${`${Math.min(...product.prices)} - $${Math.max(...product.prices)}`}</div>
              <input className="PD-quantity-input form-control" name="quantity" placeholder="QTY" value={selectedProduct.quantity} onChange={updateField}/>
              <h5 className="PD-shipping-options">Select product details for shipping & pickup availability.</h5>
              <div className="form-check">
                <input type="checkbox" class="form-check-input"/>
                <label className="form-check-label">Ship to Home</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input"/>
                <label className="form-check-label">Free In-Store or Curbside Pickup</label>
              </div>
              {(selectedProduct.name && selectedProduct.price && selectedProduct.size && selectedProduct.quantity) && auth.currentUser ?
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-3" onClick={() => props.addToCart(selectedProduct)}>ADD TO CART</button>:
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-3" disabled>ADD TO CART</button>
              }
            </div>
          </section>
        </>
      }
    </>
  );
};

export default ProductDetail;