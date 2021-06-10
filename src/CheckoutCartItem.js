import React, { useState, useEffect } from "react";

const CheckoutCartItem = (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0 mb-2">{props.item.name}</h6>
        <large className="text-muted">Dimensions: {props.item.size}</large><br/>
        <large className="text-muted">Quantity: {props.item.quantity}</large>
      </div>
      <span className="text-muted">${props.item.price.toFixed(2)}</span>
      <i className="bi bi-x-lg" style={{fontSize: '0.7rem'}}></i>
    </li>
  );
};

export default CheckoutCartItem;
