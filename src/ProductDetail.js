import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <section className="product-detail-container">
      <div className="PD-img-container">
        <ul className="PD-all-images">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
        <div className="PD-default-img-container">
          <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202118/0483/mahalia-hand-woven-wool-rug-1-z.jpg"/>
        </div>
      </div>
      <div className="PD-options-container">
        <h2 className="PD-title">Mahalia Hand Woven Wool Rug</h2>
        <h5 className="PD-select-size">Select Size:</h5>
        <ul className="PD-sizes-container">
          <li>3' x 5'</li>
          <li>5' x 8'</li>
          <li>8' x 10'</li>
          <li>9' x 12'</li>
          <li>10'x 14'</li>
          <li>2.5' x 9'</li>
        </ul>
        <div className="PD-cost">$399–$2,199</div>
        <input className="PD-quantity-input form-control" name="quantity" placeholder="QTY"/>
        <h5 className="PD-shipping-options">Select product details for shipping & pickup availability.</h5>
        <div class="form-check">
          <input type="checkbox" class="form-check-input"/>
          <label class="form-check-label">Ship tp Home</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input"/>
          <label class="form-check-label">Free In-Store or Curbside Pickup</label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">ADD TO CART</button>
      </div>
    </section>
  );
};

export default ProductDetail;