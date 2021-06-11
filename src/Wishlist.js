import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();

  useEffect(() =>{
    db.collection('users').doc(auth.currentUser.uid).collection('wishlist').onSnapshot(doc => {
      let tempWishlist = [];
      doc.forEach(wishlist => {if(wishlist.data().wishlist) tempWishlist.push(wishlist.data())})
      setWishlist(tempWishlist)
    })
  },[])

  const removeWishlist = (id) => {
    db.collection('users').doc(auth.currentUser.uid).collection('wishlist').doc(id).delete()
  }

  return (
    <section className="wishlist-container">
      <h2>Wishlist</h2>
      <ul className="wishlist-ul">
        {wishlist && wishlist.map(wishlist => {
          return (
            <li>
              <Link to={`/product/${wishlist.productId}`}><img style={{width:'70px'}} src={wishlist.img}></img></Link>
              <Link to={`/product/${wishlist.productId}`}><h4 style={{width:'500px'}} className="mb-0">{wishlist.name}</h4></Link>
              <h5 className="mb-0">${wishlist.price}</h5>
              <i onClick={() => removeWishlist(wishlist.productId)} className="bi bi-x-lg" style={{fontSize: ".8rem"}}></i>
            </li>
          )
        })}
      </ul>
    </section>
  );
};

export default Wishlist;