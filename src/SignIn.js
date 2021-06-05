import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
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

    try {
      await props.signIn(input.email, input.password);
      history.push("/dashboard");
    } catch(e){
      console.log(e.message);
    }
  }

  const redirectToSignUp = () => {
    history.push('/sign-up');
  }

  return (
    <div className="container left-panel-active">
      <div className="form-container sign-in-container">
        <form className="form-create-account" onSubmit={signIn}>
          <h1 className="h1-fix">Sign In</h1><br/>
          <input type="email" name="email" placeholder="Email" value={input.email} onChange={updateField}/>
          <input type="password" name="password" placeholder="Password" value={input.password} onChange={updateField}/>          
          <a className="a-fix" href="#">Forgot Your Password</a>
          <button className="button-fix">Sign In</button>
        </form>
      </div>
      
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1 className="h1-fix">Hello, Friend!</h1>
            <p className="p-fix">Enter your details and start journey with us</p>
            <button className="ghost button-fix" id="signUp" onClick={redirectToSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
