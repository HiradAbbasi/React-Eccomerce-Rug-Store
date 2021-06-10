import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddressInput from "./AddressInput";

const SignUp = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [settingsUpdateErr, setSettingsUpdateErr] = useState(false);

  const history = useHistory();
  const inputs = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
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
    setFormSubmitted(true);

    try {
      await props.signUp(input);
    } catch(e) {
      console.log(e);
      //setSettingsUpdateErr(true);
    }
  }

  const redirectToSignIn = () => {
    history.push('/sign-in');
  }

  const onSelectInfo = (postalCode, city, state, country, address) => {
    setInput(prevInputs => ({...prevInputs, ['address'] : address }));
    setInput(prevInputs => ({...prevInputs, ['postalCode'] : postalCode }));
    setInput(prevInputs => ({...prevInputs, ['city'] : city }));
    setInput(prevInputs => ({...prevInputs, ['state'] : state }));
    setInput(prevInputs => ({...prevInputs, ['country'] : country }));
  }

  return (
    <section className="signIn-signUp-container">
      <div className="left-container">
        <div className="random-message-center">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button onClick={redirectToSignIn}>Sign In</button>
        </div>  
      </div>
      <div className="right-container">
        <div className="form-container">
          <h1>Create Account</h1><br/>
          <form onSubmit={signUp}>
            <div className="form-row">
              <div className="form-group col-md-6 mb-3">
                <label>First Name</label>
                <input required type="text" className="form-control" name="firstName" placeholder="First Name" value={input.firstName} onChange={updateField}/>
                {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
              </div>
              <div className="form-group col-md-6 mb-3">
                <label>Last Name</label>
                <input required type="text" className="form-control" name="lastName" placeholder="Last Name" value={input.lastName} onChange={updateField}/>
                {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8 mb-3">
                <label>Address</label>
                {<AddressInput onSelectInfo={onSelectInfo} />}
                {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
              </div>
              <div className="form-group col-md-4 mb-3">
                <label>Postal Code</label>
                <input required disabled type="text" className="form-control" name="postalCode" placeholder="Code" value={input.postalCode} onChange={updateField}/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4 mb-3">
                <label>City</label>
                <input required disabled type="text" className="form-control" name="city" placeholder="City" value={input.city} onChange={updateField}/>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label>State</label>
                <input required disabled type="text" className="form-control" name="state" placeholder="State/Province" value={input.state} onChange={updateField}/>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label>Country</label>
                <input required disabled type="text" className="form-control" name="country" placeholder="Country" value={input.country} onChange={updateField}/>
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input required type="email" className="form-control" name="email" placeholder="Email" value={input.email} onChange={updateField}/>
              {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 mb-3">
                <label>Password</label>
                <input required type="password" className="form-control" name="password" placeholder="Password" value={input.password} onChange={updateField}/>
                {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
              </div>
              <div className="form-group col-md-6 mb-4">
                <label>Confirm Password</label>
                <input required type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={input.confirmPassword} onChange={updateField}/>
                {/* <div className="alert alert-warning mt-2 mb-0" role="alert">ERROR MESSAGE GOES HERE</div> */}
              </div>
            </div>
            {/* <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                <label class="form-check-label" for="gridCheck">Check me out</label>
              </div>
            </div> */}
            {/* {formSubmitted && (settingsUpdateErr ? 
              <div className="alert alert-danger" role="alert"> 
                <h5 className="alert-heading">Update Unsuccessful</h5> 
                <p className="mb-0">Unable to update account settings</p> 
              </div> :
              <div className="alert alert-success" role="alert"> 
                <h5 className="alert-heading">Update Successful</h5> 
                <p className="mb-0">Account Settings Updated Successfully</p> 
              </div>)
            }    */}
            <button type="submit" className="btn btn-primary btn-lg btn-block">SIGN UP</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

