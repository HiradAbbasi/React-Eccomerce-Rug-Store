import React, { useState } from "react";
import CartItem from "./CartItem";

const CartDropdown = () => {
  let products = [1,2];
  return (
    <div className="cart-dropdown"> 
      <i class="bi bi-chevron-up"></i>
      <div class="list-group">

        {products.length > 0 ? 
        <>
          <CartItem />
        </> :
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Your shopping cart is currently empty</h5>
          </div>
        </a>}
      </div>
    </div>
  );
};

export default CartDropdown;
