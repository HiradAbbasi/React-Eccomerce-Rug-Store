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
          // <Link key={product[1]} to={`/product/${product[1]}`}></Link>
          <section className="product-card">
            <div className="product-card-left">
              <img style={{width: '100%'}} src={product[0].images[0]}></img>
            </div>
            <div className="product-card-right">
              <h4 className="product-card-title">Product Name</h4>
              <h4 className="product-card-price-range">$299 - 999</h4>
              <ul className="product-card-horizontal-ul">
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
                <li>2.5' x 10'</li>
              </ul>
              <div className="product-card-view-review">
                <button type="submit" className="btn btn-primary btn-sm">ADD TO CART</button>
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

//onClick={() => props.addToCart(selectedProduct)}

//<div className="card text-white bg-primary mb-3" style={{width: "12rem"}}>
 // <div className="card-body" id={product[1]}>
   // <img className="mb-3" src={product[0].images[0]} style={{width: "100px"}}/>
   // <h5 className="card-title">{product[0].name}</h5>
  //  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
 // </div>
//</div>