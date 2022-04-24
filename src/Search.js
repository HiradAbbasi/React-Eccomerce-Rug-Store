import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import ReadOnlyStarsRating from './ReadOnlyStarsRating';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [products, setProducts] = useState();

  useEffect(() => {
    let tempProducts = [];
    db.collection('products').onSnapshot(snapshot => {
      snapshot.docs.forEach(doc => {
        if(query){
          if(doc.data().name.toLowerCase().includes(query)) tempProducts.push(doc.data());
        } else {
          tempProducts.push(doc.data());
        }
      })
      setProducts(tempProducts);
    })
  }, [query]);

  return (
    <>
      <div className="history-redirect-links"> 
        <Link to={"/"}>Home</Link>
        <i class="bi bi-chevron-right"></i> 
        <Link to={"/results"}>Search</Link>
        <i class="bi bi-chevron-right"></i> 
        {query}
      </div>
      <section className="all-query-results-container">
        {products && products.map(product =>
            <section className="product-card">
              <div className="product-card-left">
                <img style={{width: '100%'}} src={product.images[0].replace('-r.jpg', '-z.jpg')}></img>
              </div>
              <div className="product-card-right">
                <h4 className="product-card-title">{product.name}</h4>
                <h4 className="product-card-price-range">${product.prices.sort((a, b) => a - b)[0]} - {product.prices.sort((a, b) => b - a)[0]}</h4>
                <ul className="product-card-horizontal-ul">
                  {product && product.dimensions.map(size => {
                    return(
                      <li>{size}</li>
                    )
                  })}
                </ul>
                <div className="product-card-view-review">
                  <Link to={`/product/${product.productId}`}>
                    <button type="button" className="btn btn-primary btn-sm">ADD TO CART</button>
                  </Link>  
                  <div className="product-card-star-container"><ReadOnlyStarsRating rating={Math.round(product.averageRating)} size={15}/></div>
                </div>
              </div>
            </section>
        )}
      </section>
    </>
  );
}

export default Search;