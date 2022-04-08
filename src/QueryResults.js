import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import ReadOnlyStarsRating from './ReadOnlyStarsRating';

const QueryResults = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    let tempProducts = [];
    db.collection('products').onSnapshot(snapshot => {
      snapshot.docs.forEach(doc => {
        tempProducts.push([doc.data(), doc.id]);
      })
      setProducts(tempProducts);
    })
  }, []);

  return (
    <>
      <section className="all-query-results-container">
        {products && products.map(product =>
          <section className="product-card">
            <div className="product-card-left">
              <img style={{width: '100%'}} src={product[0].images[0].replace('-r.jpg', '-z.jpg')}></img>
            </div>
            <div className="product-card-right">
              <h4 className="product-card-title">{product[0].name}</h4>
              <h4 className="product-card-price-range">${product[0].prices.sort((a, b) => a - b)[0]} - {product[0].prices.sort((a, b) => b - a)[0]}</h4>
              <ul className="product-card-horizontal-ul">
                {product[0] && product[0].dimensions.map(size => {
                  return(
                    <li>{size}</li>
                  )
                })}
              </ul>
              <div className="product-card-view-review">
                <Link to={`/product/${product[1]}`}>
                  <button type="button" className="btn btn-primary btn-sm">ADD TO CART</button>
                </Link>  
                <div className="product-card-star-container"><ReadOnlyStarsRating rating={3} size={15}/></div>
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default QueryResults;

