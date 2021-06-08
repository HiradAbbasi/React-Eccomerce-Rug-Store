import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState('https://www.ivsauto.ca/frontend/assets/images/placeholder/inventory-full-placeholder.png');
  let sixDigitId;
  let fourDigitId;
  let rugName;
  
  useEffect(() => {
    getLargeImg(0);
    // if(allImagesContainer.children) {
    //   console.log('s')
    // }
    // setActiveImg();
  }, []);

  const getLargeImg = (num) => {
    let allImagesContainer = document.querySelector('.PD-all-images');
    allImagesContainer.querySelectorAll('.PD-all-images li').forEach(element => {
      element.classList.remove('selected-product-img');
    });  
    
    if(allImagesContainer.querySelectorAll('li img').length > 0) {
      allImagesContainer.querySelectorAll('li')[num].classList.toggle('selected-product-img')
      sixDigitId = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(50, 6);
      fourDigitId = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(57, 4);
      rugName = allImagesContainer.querySelectorAll('li img')[num].getAttribute('src').substr(62).replace("-r.jpg", "-z.jpg");
      
      let defaultSrc = `https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/${sixDigitId}/${fourDigitId}/${rugName}`;
      setActiveImg(defaultSrc);
    }
  }
  
  return (
    <section className="product-detail-container">
      <div className="PD-img-container">
        <ul className="PD-all-images">
          <li onClick={() => getLargeImg(0)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202118/0483/mahalia-hand-woven-wool-rug-1-r.jpg"/></li>
          <li onClick={() => getLargeImg(1)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202109/1056/mahalia-hand-woven-wool-rug-r.jpg"/></li>
          <li onClick={() => getLargeImg(2)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202109/0948/mahalia-hand-woven-wool-rug-r.jpg"/></li>
          <li onClick={() => getLargeImg(3)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202109/0667/mahalia-hand-woven-wool-rug-r.jpg"/></li>
          <li onClick={() => getLargeImg(4)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202109/0815/mahalia-hand-woven-wool-rug-r.jpg"/></li>
          <li onClick={() => getLargeImg(5)}><img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202113/0025/mahalia-hand-woven-wool-rug-r.jpg"/></li>
        </ul>
        <div className="PD-default-img-container">
          <img src={activeImg}/>
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
          <label class="form-check-label">Ship to Home</label>
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