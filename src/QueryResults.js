import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth, firebase } from "./firebase";

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
          <Link to={`/product/${product[1]}`}>
            <div className="card text-white bg-primary mb-3" style={{width: "20rem"}}>
              <h5 className="card-title">{product[1]}</h5>
              <div className="card-body" id={product[1]}>
                <img className="mb-3" src={product[0].images[0]} style={{width: "100px"}}/>
                <h5 className="card-title">{product[0].name}</h5>
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              </div>
            </div>
          </Link>
        )}
      </section>
    </>
  );
};

export default QueryResults;
