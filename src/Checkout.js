import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import CheckoutCartItem from "./CheckoutCartItem";
import moment from 'moment';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.i18n';

const Checkout = (props) => {
  const [input, setInput] = useState();
  const [cardType, setCardType] = useState('fa fa-cc-mastercard');
  const [discount, setDiscount] = useState();
  
  useEffect(() => {
    db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc => {
      setInput({
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        city: doc.data().city,
        state: doc.data().state,
        country: doc.data().country,
        postalCode: doc.data().postalCode,
        email: auth.currentUser.email,
        phoneNumber: auth.currentUser.phoneNumber || '',
        cardHolderName: doc.data().cardHolderName || '',
        cardNumber: doc.data().cardNumber || '',
        cardExpiration: doc.data().cardExpiration || '',
        cardCCV: doc.data().cardCCV || '',
      })
    })
  }, []);

  const updateField = (e) => {
    if(e.target.value == "") {
      document.querySelector(`form input[name=${e.target.name}]`).classList.add('is-invalid');
    } else {
      document.querySelector(`form input[name=${e.target.name}]`).classList.replace('is-invalid', 'is-valid');
    }

    e.persist(); 
    setInput(prevInputs => ({...prevInputs, [e.target.name]: e.target.value}));
  }
  
  const onContinueCheckout = (e) => {
    e.preventDefault();
    db.collection('users').doc(auth.currentUser.uid).collection('orders').doc().set({
      orderItems: props.cartItems,
      userDetails: input,
      uploadDate: moment().format('L'),
      total: document.querySelector("#total-cost strong").textContent,
    })
  }

  const checkRedeemCode = (e) => {
    e.preventDefault();
    if(input.promoCode) {
      db.collection('promo').doc(input.promoCode).onSnapshot(doc => {
        if(doc.data()) setDiscount({discount:doc.data().discount, discountName: input.promoCode})
        else setDiscount()
      })
    }
  }
  
  const onCleaveCreditCard = (e) => {
    if (['amex', 'visa', 'jcb', 'diners-club', 'mastercard', 'discover'].find(type => cardType.includes(type))) {
      document.querySelector(`.creditCardNumberClass`).classList.remove('is-invalid');
      document.querySelector(`.creditCardNumberClass`).classList.add('is-valid');
    } else {
      document.querySelector(`.creditCardNumberClass`).classList.replace('is-valid', 'is-invalid');
    }
  
    setInput(prevInputs => ({...prevInputs, 'cardNumber': e.target.value}));
  }

  const onCleaveExpiration = (e) => {
    if(e.target.value.length < 5) {
      document.querySelector(`.expirationClass`).classList.add('is-invalid');
    } else {
      document.querySelector(`.expirationClass`).classList.replace('is-invalid', 'is-valid');
    }
    setInput(prevInputs => ({...prevInputs, 'cardExpiration': e.target.value}));
  }

  const onCleavePhoneNumber = (e) => {
    if (e.target.value.length < 15) {
      document.querySelector(`.phoneNumberClass`).classList.add('is-invalid');
    } else {
      document.querySelector(`.phoneNumberClass`).classList.replace('is-invalid', 'is-valid');
    }

    setInput(prevInputs => ({...prevInputs, 'phoneNumber': e.target.value}));
  }

  return (
    <>
      {input && 
        <div className="container" style={{marginBottom: '200px'}}>
          <div className="py-5 text-center">
            <h2>Checkout</h2>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-primary badge-pill">{props.cartItems && props.cartItems.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {props.cartItems.map(item => (
                  <CheckoutCartItem item={item} key={item.id}/>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal (CAD)</span>
                  <strong>${(props.cartItems && props.cartItems.length > 0) ? props.cartItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next).toFixed(2) : 0}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between" id="total-cost">
                  <span>Total (TAX + DISCOUNT)</span>
                  {discount ? <strong>${(props.cartItems && props.cartItems.length > 0) ? ((props.cartItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next) - discount.discount) * 1.13).toFixed(2) : 0 }</strong> : <strong>${(props.cartItems && props.cartItems.length > 0) ? (props.cartItems.map(item => item.price * item.quantity).reduce((prev, next) => prev + next) * 1.13).toFixed(2) : 0 }</strong> }
                </li>
                {discount  ? 
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-primary">
                      <h6 className="my-0">Promo code</h6>
                      <small>{discount.discountName.toUpperCase()}</small>
                    </div>
                    <span className="text-primary">-${discount.discount}</span>
                  </li> :
                  <li className="list-group-item d-flex justify-content-between bg-light">
                      <h6 className="my-0">Invalid Promo code</h6>
                  </li> 
                }
              </ul>
              <form className="card p-2" onSubmit={checkRedeemCode}>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" name="promoCode" value={input.promoCode} onChange={updateField}/>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form onSubmit={onContinueCheckout}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" value={input.firstName || ""} onChange={updateField} required/>
                    <div class="invalid-feedback">
                      Please provide a first name.
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastName" value={input.lastName || ""} onChange={updateField} required/>
                    <div class="invalid-feedback">
                      Please provide a last name.
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label>Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" name="email" value={input.email || ""} onChange={updateField} placeholder="you@example.com" />
                  <div class="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>

                <div className="mb-4">
                  <label>Phone Number <span className="text-muted">(Optional)</span></label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i class="bi bi-telephone"></i></span>
                    </div>
                    <Cleave 
                      className="form-control phoneNumberClass" 
                      placeholder="Enter Phone Number"
                      options={{prefix: `+1`, phone: true, phoneRegionCode: 'CA'}}
                      onChange={onCleavePhoneNumber.bind(this)}
                    />
                    <div class="invalid-feedback">
                      Please provide a valid phone number.
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label>Address</label>
                  <input type="text" className="form-control" name="address" placeholder="1234 Main St" value={input.address || ""} disabled required/>
                  {/* <div className="invalid-feedback">Please enter your shipping address.</div> */}
                </div>

                <div className="mb-4">
                  <label>Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" name="address2" value={input.address2 || ""} onChange={updateField} placeholder="Apartment or suite"/>
                  <div class="invalid-feedback">
                    Please enter a valid address.
                  </div>
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
                  <input class="form-check-input" type="checkbox" />
                  <label>Shipping address is the same as my billing address</label>
                </div>

                <div class="form-check custom-checkbox">
                  <input class="form-check-input" type="checkbox" />
                  <label>Save this information for next time</label>
                </div>

                <hr className="mb-4"/>
                <h4 className="mb-3">Payment</h4>                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Name on card as displayed on card</label>
                    <input type="text" className="form-control" placeholder="ex. John Niziol" name="cardHolderName" value={input.cardHolderName} onChange={updateField} required/>
                    <div class="invalid-feedback">
                      Please provide a valid name.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Credit card number</label>
                    <div class="input-group mb-2">   
                      <div class="input-group-prepend">
                        <div class="input-group-text"><i style={{fontSize: "1.5rem"}} className={`${cardType}`}></i></div>
                      </div>
                      <Cleave 
                        className="form-control creditCardNumberClass" 
                        placeholder="Enter Credit Card Number"
                        options={{creditCard: true, delimiter: '-', onCreditCardTypeChanged: function (type) {
                          if (['amex', 'visa', 'jcb', 'mastercard', 'discover'].find(cardType => cardType == type)) setCardType(`fa fa-cc-${type}`)
                          else if (type == 'diners') setCardType('fa fa-cc-diners-club') 
                          else setCardType('fa fa-american-sign-language-interpreting')
                          setInput(prevInputs => ({...prevInputs, 'cardType': type}));
                        }}}
                        onChange={onCleaveCreditCard.bind(this)}
                      />
                      <div class="invalid-feedback">
                        Please provide a valid card number.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label>Expiration</label>
                    <Cleave 
                      className="form-control expirationClass" 
                      placeholder="02/21"
                      options={{date: true, datePattern: ['m', 'y']}}
                      onChange={onCleaveExpiration.bind(this)}
                    />
                    <div class="invalid-feedback">
                      Please provide a valid expiration date.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>CVV</label>
                    <input type="text" className="form-control" name="cardCCV" placeholder="212" maxLength="3" value={input.cardCCV} onChange={updateField} required/>
                    <div class="invalid-feedback">
                      Please provide a valid CCV.
                    </div>
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
