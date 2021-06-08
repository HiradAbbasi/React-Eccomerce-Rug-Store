import React, { useState } from "react";

const CartItem = () => {
  return (
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="product-container w-100">
        <img style={{width:"50px"}} src="https://secure.img1-fg.wfcdn.com/im/17399036/resize-h250%5Ecompr-r85/7422/74228577/Traditional+Red/Green+Area+Rug.jpg%20250w,https://secure.img1-fg.wfcdn.com/im/88282283/resize-h400%5Ecompr-r85/7422/74228577/Traditional+Red/Green+Area+Rug.jpg%20400w,https://secure.img1-fg.wfcdn.com/im/11929005/resize-h600%5Ecompr-r85/7422/74228577/Traditional+Red/Green+Area+Rug.jpg%20600w,https://secure.img1-fg.wfcdn.com/im/35575727/resize-h800%5Ecompr-r85/7422/74228577/Traditional+Red/Green+Area+Rug.jpg" />
        <large>Persian Rug</large>
        <large>$198.00</large>
        <div><i class="bi bi-plus-circle mr-2"></i><large>1</large><i class="bi bi-dash-circle ml-2"></i></div>
        <i class="bi bi-x-lg" style={{fontSize: "0.7rem"}}></i>
      </div>
    </a>
  );
};

export default CartItem;
