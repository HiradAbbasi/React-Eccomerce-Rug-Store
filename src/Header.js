import React, { useState, useEffect } from "react";
import "../src/Header.css";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import CartItem from "./CartItem";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    let tempCartItems = [];
    db.collection('users').doc(auth.currentUser.uid).collection('cart').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempCartItems.push(doc.data());
      });
      setCartItems(tempCartItems);
    });
  }, [cartItems]);

  const addQuantity = () => {
    console.log('Added quantity')
  }

  const removeQuantity = () => {
    console.log('Removed quantiy')
  }

  const removeFromCart = () => {
    console.log('Removed from cart')
  }

  const logout = () => {
    auth.signOut();
  }

  const test = () => {
    setShowCart(!showCart);
  }

  return (
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
                    <a href="#">Ecommerce</a>
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
                        <a href="#">Wishlist</a>
                      </div>
                      <div className="wishlist_count">10</div>
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
                          <span>1</span>
                        </div>
                      </div>
                      <div className="cart_content">
                      
                        <div className="cart_text">
                          <Link to='/checkout'>Cart</Link>
                        </div>
                        <div className="cart_price">$185</div>
                        {showCart &&
                          <div className="cart-dropdown"> 
                            <i class="bi bi-chevron-up"></i>
                            <div class="list-group">
                              {cartItems.length > 0 ? cartItems.map((item) =>
                                <CartItem key={item.id} item={item.cartItems} addQuantity={addQuantity} removeQuantity={removeQuantity}/>
                              ) :
                              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100" style={{justifyContent: 'center', }}>
                                  <h5 class="mb-0" >Your shopping cart is currently empty</h5>
                                </div>
                              </a>}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
