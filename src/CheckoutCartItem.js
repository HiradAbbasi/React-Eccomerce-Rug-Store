import React, { useState, useEffect } from "react";

const CheckoutCartItem = () => {
  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">Mahalia Hand Woven Wool Rug</h6>
        <small className="text-muted">Brief description</small>
      </div>
      <span className="text-muted">$1000.00</span>
      <i class="bi bi-x-lg" style={{fontSize: '0.7rem'}}></i>
    </li>
  );
};

export default CheckoutCartItem;
