import React, { useState } from "react";

const CartItem = () => {
  return (
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="product-container w-100">
        <img style={{width:"70px"}} src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202118/0483/mahalia-hand-woven-wool-rug-1-r.jpg" />
        <large>Mahalia Hand Woven Wool Rug</large>
        <large>$198.00</large>
        <div><i class="bi bi-plus-circle mr-2"></i><large>1</large><i class="bi bi-dash-circle ml-2"></i></div>
        <i class="bi bi-x-lg" style={{fontSize: "0.7rem"}}></i>
      </div>
    </a>
  );
};

export default CartItem;
