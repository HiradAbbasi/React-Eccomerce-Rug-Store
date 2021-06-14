import React, { useState, useEffect } from "react";
import "../src/Header.css";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import CartItem from "./CartItem";

const Header = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState();
  // const [cartItems, setCartItems] = useState();

  useEffect(() => {
    if(auth.currentUser) {
      db.collection('users').doc(auth.currentUser.uid).collection('wishlist').onSnapshot(doc => {
        let tempWishlist = [];
        doc.forEach(wishlist => {
          if(wishlist.data().wishlist) tempWishlist.push(wishlist.data().wishlist)
        })
        setWishlist(tempWishlist);
      })
    }
  },[])

  const addQuantity = (id) => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).get().then(doc => doc.data().quantity).then( quantity => {
      db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).update({
        quantity: parseInt(quantity) + 1
      }).catch(err => {
        console.log(err);
      })
    })
  }

  const removeQuantity = (id) => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).get().then(doc => doc.data().quantity).then(quantity => {
      if(quantity > 1) {
        db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).update({
          quantity: parseInt(quantity) - 1
        }).catch(err => {
          console.log(err);
        })
      } else {
        removeFromCart(id);
      }
    })
  }

  const removeFromCart = (id) => {
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(id).delete().then(() => {
      console.log('Removed from cart');
    }).catch((error) => {
        console.log(error);
    });
  }

  const logout = () => {
    auth.signOut();
  }

  const test = () => {
    setShowCart(!showCart);
  }

  return (
    <>
      <div className="super_container">
        <header className="header">
          <div className="top_bar">
            <div className="container">
              <div className="row">
                <div className="col d-flex flex-row">
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <img
                        src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918577/phone.png"
                        alt=""
                      />
                    </div>
                    +1 (204) 222-2222
                  </div>
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <img
                        src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918597/mail.png"
                        alt=""
                      />
                    </div>
                    <a href="mailto:fastsales@gmail.com">
                      contact@ecommerce.com
                    </a>
                  </div>
                  <div className="top_bar_content ml-auto">
                    <div className="top_bar_menu">
                      <ul className="standard_dropdown top_bar_dropdown">
                        <li>
                          {" "}
                          <a href="#">
                            English<i className="fas fa-chevron-down"></i>
                          </a>
                          <ul>
                            <li>
                              <a href="#">French</a>
                            </li>
                            <li>
                              <a href="#">Farsi</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          {" "}
                          <a href="#">
                            $ US dollar<i className="fas fa-chevron-down"></i>
                          </a>
                          <ul>
                            <li>
                              <a href="#">EUR Euro</a>
                            </li>
                            <li>
                              <a href="#">GBP British Pound</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="top_bar_user">
                      <div className="user_icon">
                        <img
                          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918647/user.svg"
                          alt=""
                        />
                      </div>
                      {auth.currentUser ? <>
                        <div>
                          <Link to="/sign-in" onClick={logout}>Sign Out</Link>
                        </div>
                        <div>
                          <Link to='/dashboard'>My Account</Link>
                        </div>
                      </>: 
                      <>
                        <div>
                          <Link to='/sign-in'>Sign in</Link>
                        </div>
                        <div>
                          <Link to='/sign-up'>Register</Link>
                        </div>
                      </>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header_main">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-sm-3 col-3 order-1">
                  <div className="logo_container">
                    <div className="logo">
                      <Link to='/results'>Ecommerce</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                  <div className="header_search">
                    <div className="header_search_content">
                      <div className="header_search_form_container">
                        <form action="#" className="header_search_form clearfix">
                          <input
                            type="search"
                            className="header_search_input"
                            placeholder="Search for products..."
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {auth.currentUser &&                
                  <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
                    <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                      <div className="wishlist d-flex flex-row align-items-center justify-content-end">
                        <div className="wishlist_icon">
                          <img
                            src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918681/heart.png"
                            alt=""
                          />
                        </div>
                        <div className="wishlist_content">
                          <div className="wishlist_text">
                            <Link to='/wishlist'>Wishlist</Link>
                          </div>
                          <div className="wishlist_count">{wishlist && wishlist.length}</div>
                        </div>
                      </div>
                      <div className="cart">
                        <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                          <div className="cart_icon" onClick={test}>
                            <img
                              src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918704/cart.png"
                              alt=""
                            />
                            <div className="cart_count">
                              <span>{props.cartItems && props.cartItems.length}</span>
                            </div>
                          </div>
                          <div className="cart_content">
                            <div className="cart_text">
                              <Link to='/checkout'>Cart</Link>
                            </div>
                            <div className="cart_price">${(props.cartItems && props.cartItems.length > 0) ? props.cartItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next).toFixed(2) : 0}</div>
                            {showCart &&
                            <div className="cart-dropdown"> 
                              <i className="bi bi-chevron-up"></i>
                              <div className="list-group">
                                {props.cartItems.length > 0 ? props.cartItems.map((item) =>
                                  <CartItem key={item.id+item.size} item={item} addQuantity={addQuantity} removeQuantity={removeQuantity} removeFromCart={removeFromCart}/>
                                ) :
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                  <div className="d-flex w-100" style={{justifyContent: 'center', }}>
                                    <h5 className="mb-0" >Your shopping cart is currently empty</h5>
                                  </div>
                                </a>}
                              </div>
                            </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
