import React from "react";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  return (
    <>
      {props.item &&
        <Link className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="product-container w-100">
            <img style={{width:"70px"}} src={props.item.cartImg} />
            <large style={{width: "290px"}}>{props.item.name}<br/> ({props.item.size})</large>
            <large>${props.item.price.toFixed(2)}</large>
            <div><i onClick={() => props.addQuantity(props.item.id+props.item.size)} className="bi bi-plus-circle mr-2"></i><large>{props.item.quantity}</large><i onClick={() => props.removeQuantity(props.item.id+props.item.size)} className="bi bi-dash-circle ml-2"></i></div>
            <i onClick={() => props.removeFromCart(props.item.id+props.item.size)} className="bi bi-x-lg" style={{fontSize: "0.7rem"}}></i>
          </div>
        </Link>
      }
    </>
  );
};

export default CartItem;
