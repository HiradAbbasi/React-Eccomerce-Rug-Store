import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { db, auth } from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import ProductDetail from "./ProductDetail";
import CartDropdown from "./CartDropdown";

const App = () => {
  const [currentUser, setCurrentUser] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
        postalCode: userInfo.postalCode,
      })
    })
  }

  return (
    <>
      {!loading && 
        <>
          <Header />
          <Switch>
            <Route exact path="/">
              {currentUser ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            <Route path="/sign-in">
              {currentUser ? <Redirect to="/dashboard" /> : <SignIn signIn={signIn} />}
            </Route>
            <Route path="/sign-up">
              {currentUser ? <Redirect to="/dashboard" /> : <SignUp signUp={signUp} />}
            </Route>
            <Route path="/dashboard">
              {currentUser ? <Dashboard currentUser={currentUser} /> : <Redirect to="/sign-in"/>}
            </Route>
            <Route path="/product/:id">
              <ProductDetail />
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
