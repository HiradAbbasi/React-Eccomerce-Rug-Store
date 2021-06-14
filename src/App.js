import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { db, auth } from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import QueryResults from "./QueryResults";
import CommentsAndReviews from "./CommentsAndReviews";
import Wishlist from "./Wishlist";

const App = () => {
  const [currentUser, setCurrentUser] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        db.collection('users').doc(auth.currentUser.uid).collection('cart').onSnapshot((querySnapshot) => {
          let tempCartItems = [];
          querySnapshot.forEach((doc) => {
            tempCartItems.push(doc.data());
          });
          setCartItems(tempCartItems);
        })
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   db.collection('users').doc(auth.currentUser.uid).update({
  //     cartItems: cartItems,
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }, [cartItems]);

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signUp = (userInfo) => {
    auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        country: userInfo.country,
        postalCode: userInfo.postalCode,
      })
    })
  }

  const addToCart = (item) => {
    console.log(item);
    db.collection('users').doc(auth.currentUser.uid).collection('cart').doc(item.id+item.size).set({
      ...item,
    }) 
  }

  return (
    <>
      {!loading && 
        <>
          <Header cartItems={cartItems}/>
          <Switch>
            <Route exact path="/">
              {currentUser ? <Redirect to="/results" /> : <Redirect to="/sign-in" />}
            </Route>
            <Route path="/sign-in">
              {currentUser ? <Redirect to="/results" /> : <SignIn signIn={signIn} />}
            </Route>
            <Route path="/sign-up">
              {currentUser ? <Redirect to="/results" /> : <SignUp signUp={signUp} />}
            </Route>
            <Route path="/dashboard">
              {currentUser ? <Dashboard /> : <Redirect to="/sign-in"/>}
            </Route>
            <Route path="/product/:id">
              {cartItems && 
                <>
                  <ProductDetail addToCart={addToCart}/>
                  <CommentsAndReviews />
                </>
              }
            </Route>
            <Route path="/checkout">
              {currentUser ? <Checkout cartItems={cartItems} />: <Redirect to="/sign-in"/>}
            </Route>
            <Route path="/results">
              {currentUser ? <QueryResults /> : <Redirect to="/sign-in"/>} 
            </Route>
            <Route path="/wishlist">
              {currentUser ? <Wishlist /> : <Redirect to="/sign-in"/>} 
            </Route>
            {/* <Route path="/search">
              <Search search={search} toggleFavorite={toggleFavorite} searchedShows={searchedShows} />
            </Route> */}
            {/* <Route path="/details/:id">
              <ProductDetail toggleFavorite={toggleFavorite} favourites={favourites} />
            </Route>
            <Route path="/my-watch-list/">
              <WatchList toggleFavorite={toggleFavorite} favourites={favourites} />
            </Route> */}
          </Switch>
          <Footer/>
        </>
      }
    </>
  );
};

export default App;
