import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, firebase } from "./firebase";

const SignIn = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  const inputs = {
    email: "",
    password: "",
  }

  const [input, setInput] = useState(inputs);

  const updateField = (e) => {
    e.persist();
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }

  const signIn = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      await props.signIn(input.email, input.password);
    } catch(e){
      setErrMessage(e.message);
    }
  }

  const redirectToSignUp = () => {
    history.push('/sign-up');
  }

  const onForgotPassword = () => {
    auth.sendPasswordResetEmail(input.email).then(function() {
      console.log('Email Sent Successfully');
      setErrMessage('');
    }).catch(function(error) {
      setFormSubmitted(true);
      setErrMessage(error.message);
    });
  }

  const signInWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth()
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     var credential = result.credential;

    //     var token = credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //   });
  }

  return (
    <section className="signIn-signUp-container">
      <div className="right-container">
        <div className="form-container">
          <h1>Sign In</h1><br/>
          <form>
            {/* <button type="button" className="btn btn-success btn-lg mb-4" onClick={signInWithGoogle}>GOOGLE</button> */}
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" name="email" placeholder="Enter email" value={input.email} onChange={updateField}/>
            </div>
            <div className="form-group mb-2">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" value={input.password} onChange={updateField}/>
            </div>
            <button type="button" class="btn btn-link pl-0" onClick={onForgotPassword}>Forgot password?</button>  
            {formSubmitted && (errMessage.length > 0 ?
              <div className="alert alert-danger" role="alert"> 
                <h5 className="alert-heading">Sign In Failed</h5> 
                <p className="mb-0">{errMessage}</p> 
              </div> : 
              <div className="alert alert-success" role="alert"> 
                <h5 className="alert-heading">Email Sent Successfully</h5> 
                {/* <p className="mb-0">{errMessage}</p>  */}
              </div>)}   
            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={signIn}>SIGN IN</button>
          </form>
        </div>
      </div>
      <div className="left-container">
        <div className="random-message-center">
          <h1>Hello, Friend!</h1>
          <p>Enter your details and start your journey with us</p>
          <button onClick={redirectToSignUp}>Sign Up</button>
        </div>  
      </div>
    </section>
  );
};

export default SignIn;
