import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import CheckoutCartItem from "./CheckoutCartItem";
import moment from 'moment';

const Checkout = (props) => {
  const [input, setInput] = useState();
  const promoCode = 460.69;

  useEffect(() => {
    db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
      setInput({
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        city: doc.data().city,
        state: doc.data().state,
        country: doc.data().country,
        postalCode: doc.data().postalCode,
        email: auth.currentUser.email,
        cardHolderName: doc.data().cardHolderName || '',
        cardNumber: doc.data().cardNumber || '',
        cardExpiration: doc.data().cardExpiration || '',
        cardCCV: doc.data().cardCCV || '',
      })
    })
  }, []);

  const updateField = (e) => {
    if(e.target.name === 'cardNumber'){
      if(e.target.value.replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').length === 16){
        validateCreditCard(e.target.value.replaceAll('-', ''));
      }
    }

    e.persist(); 
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value}));
  }

  const validateCreditCard = (value) => {
    value = Array.from(String(value), num => Number(num));
    console.log(value);
    if(toDouble(value).reduce((a, b) => a + b, 0) % 10) {
      console.log("PLEASE TRY A DIFFERENT NUMBER");
    } else {
      console.log("VALID CREDIT CARD");
    }
  }

  const toDouble = (array) => {
    for (var i = 0; i < array.length; i+=2) {
      if(array[i] * 2 > 9){
        array[i] = parseInt((array[i] * 2).toString().substr(0,1)) + parseInt((array[i] * 2).toString().substr(1,1));
      } else {
        array[i] *= 2;
      }
    }
    return array;
  }

  const test = () => {
    console.log("Shipping address is the same as my billing address, Save this information for next time");
  }
  
  const onContinueCheckout = (e) => {
    e.preventDefault();

    db.collection('users').doc(auth.currentUser.uid).collection('orders').doc().set({
      orderItems: props.cartItems,
      userDetails: input,
      uploadDate: moment().format('LL'),
    })
  }

  return (
    <>
      {input && 
        <div className="container" style={{marginBottom: '200px'}}>
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
            <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-primary badge-pill">{props.cartItems && props.cartItems.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {/* The length of the items in the cart */}
                {props.cartItems.map(item => (
                  <CheckoutCartItem item={item}/>
                ))}
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-primary">
                    <h6 className="my-0">Promo code</h6>
                    <small>HIRAD</small>
                  </div>
                  <span className="text-primary">-${promoCode}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${(props.cartItems && props.cartItems.length > 0) ? props.cartItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next) - promoCode : 0}</strong>
                </li>
              </ul>
              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code"/>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" novalidate onSubmit={onContinueCheckout}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" value={input.firstName || ""} onChange={updateField} required/>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastName" value={input.lastName || ""} onChange={updateField} required/>
                  </div>
                </div>

                <div className="mb-4">
                  <label>Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" name="email" value={input.email || ""} onChange={updateField} placeholder="you@example.com" />
                  <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
                </div>

                <div className="mb-4">
                  <label>Phone Number <span className="text-muted">(Optional)</span></label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i class="bi bi-telephone"></i></span>
                    </div>
                    <input type="text" className="form-control" name="phoneNumber" placeholder="+1 (204) 514-3242"/>
                  </div>
                </div>

                <div className="mb-4">
                  <label>Address</label>
                  <input type="text" className="form-control" name="address" placeholder="1234 Main St" value={input.address || ""} required/>
                  {/* <div className="invalid-feedback">Please enter your shipping address.</div> */}
                </div>

                <div className="mb-4">
                  <label>Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" name="address2" placeholder="Apartment or suite"/>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-4">
                    <label>Country</label>
                    <input type="text" className="form-control" name="country" placeholder="Canada" value={input.country || ""} disabled required/>
                  </div>

                  <div className="col-md-4 mb-4">
                    <label>State</label>
                    <input type="text" className="form-control primary-disabled" name="state" placeholder="Manitoba" value={input.state || ""} disabled required/>
                  </div>

                  <div className="col-md-3 mb-4">
                    <label>Zip/Postal Code</label>
                    <input type="text" className="form-control" name="postalCode" placeholder="023123" value={input.postalCode || ""} disabled required/>
                  </div>
                </div>
                <hr className="mb-4"/>

                <div class="form-check custom-checkbox">
                  <input class="form-check-input" type="checkbox" onChange={test} />
                  <label>Shipping address is the same as my billing address</label>
                </div>

                <div class="form-check custom-checkbox">
                  <input class="form-check-input" type="checkbox" onChange={test}/>
                  <label>Save this information for next time</label>
                </div>

                <hr className="mb-4"/>
                <h4 className="mb-3">Payment</h4>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input name="credit" type="radio" className="form-check-input"/>
                    <label>Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input name="debit" type="radio" className="form-check-input"/>
                    <label>Debit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input name="paypal" type="radio" className="form-check-input"/>
                    <label>PayPal</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Name on card</label>
                    <input type="text" className="form-control" placeholder="ex. John Niziol" name="cardHolderName" value={input.cardHolderName} onChange={updateField} required/>
                    <small className="text-muted">Full name as displayed on card</small>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Credit card number</label>
                    <input type="text" className="form-control" name="cardNumber" placeholder="1234-5678-9012-3456" maxLength="19" value={input.cardNumber} onChange={updateField} required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label>Expiration</label>
                    <input type="text" className="form-control" name="cardExpiration" placeholder="08/21" maxLength="5" value={input.cardExpiration} onChange={updateField} required/>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>CVV</label>
                    <input type="text" className="form-control" name="cardCCV" placeholder="212" maxLength="3" value={input.cardCCV} onChange={updateField} required/>
                  </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Checkout;
