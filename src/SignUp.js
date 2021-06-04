import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const history = useHistory();
  const inputs = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [input, setInput] = useState(inputs);

  const updateField = (e) => {
    e.persist();
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }

  const signUp = async (e) => {
    e.preventDefault();

    try {
      await props.signUp(input.email, input.password);
      history.push("/dashboard");
    } catch(e) {
      console.log(e.message);
    }
  }

  const redirectToSignIn = () => {
    history.push('/sign-in');
  }

  return (
    <div className="container right-panel-active">
      <div className="form-container sign-up-container">
        <form onSubmit={signUp}>
          <h1 className="h1-fix">Create Account</h1><br/>
          <div className="form-row-content">
            <input className="row-two-items" type="text" name="firstName" placeholder="First Name" value={input.firstName} onChange={updateField}/>
            <input className="row-two-items" type="text" name="lastName" placeholder="Last Name" value={input.lastName} onChange={updateField}/>
          </div>
          <input type="email" name="email" placeholder="Email" value={input.email} onChange={updateField}/>
          <div className="form-row-content">
            <input id="row-item-big" type="text" name="address" placeholder="Address" value={input.address} onChange={updateField}/>
            <input id="row-item-small" type="text" name="postalCode" placeholder="Postal Code" value={input.postalCode} onChange={updateField}/>
          </div>
          <div className="form-row-content">
            <input className="row-two-items" type="text" name="city" placeholder="City" value={input.city} onChange={updateField}/>
            <input className="row-two-items" type="text" name="province" placeholder="Province" value={input.province} onChange={updateField}/>
          </div>
          <input type="password" name="password" placeholder="Password" value={input.password} onChange={updateField}/>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={input.confirmPassword} onChange={updateField}/><br/>
          <button className="button-fix">SignUp</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1-fix">Welcome Back!</h1>
            <p className="p-fix">To keep connected with us please login with your personal info</p>
            <button className="ghost button-fix" id="signIn" onClick={redirectToSignIn}>Sign In</button>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default SignUp;
