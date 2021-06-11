import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "./firebase";

const ProductDetail = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [activeImg, setActiveImg] = useState('https://www.ivsauto.ca/frontend/assets/images/placeholder/inventory-full-placeholder.png');
  let sixDigitId;
  let fourDigitId;
  let rugName;
  
  useEffect(() => {
    db.collection('products').doc(id).get().then(doc => {
      setProduct(doc.data());
      setSelectedProduct({name: doc.data().name, cartImg: doc.data().images[0], id: id, quantity: 1});
    }).then(() =>
      getLargeImg(0)
    )      
  }, []);

  const getLargeImg = (num) => {
    let allImagesContainer = document.querySelector('.PD-all-images');
    allImagesContainer.querySelectorAll('.PD-all-images li').forEach(element => {
      element.classList.remove('selected-product-img');
    });  
    
    if(allImagesContainer.querySelectorAll('li img').length > 0) {
      allImagesContainer.querySelectorAll('li')[num].classList.toggle('selected-product-img')
      sixDigitId = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(50, 6);
      fourDigitId = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(57, 4);
      rugName = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(62).replace("-r.jpg", "-z.jpg");
      
      let defaultSrc = `https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/${sixDigitId}/${fourDigitId}/${rugName}`;
      setActiveImg(defaultSrc);
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

  return (
    <>
      {product &&
        <section className="product-detail-container">
          <div className="PD-img-container">
            <ul className="PD-all-images">
              {product.images.map((img, index) =>
                <li key={index} onClick={() => getLargeImg(index)}><img src={img}/></li>
              )}
            </ul>
            <div className="PD-default-img-container">
              <img src={activeImg}/>
            </div>
          </div>
          <div className="PD-options-container">
            <h2 className="PD-title">{product.name}</h2>
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
      }
    </>
  );
};

export default ProductDetail;