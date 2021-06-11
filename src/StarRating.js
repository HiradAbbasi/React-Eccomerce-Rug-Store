import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    props.reviewRating(rating);
  },[rating])

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} >
            <input type="radio" name="rating" class="radio-hide" value={ratingValue} onClick={() => setRating(ratingValue)}></input>
            <FaStar
              className="star" 
              size={20} 
              color={ ratingValue <= (hover || rating) ? "#ffc107" : "#495057"} 
              onMouseEnter={() => setHover(ratingValue)} 
              onMouseLeave={() => setHover(null)}
             />
          </label>
          )
      })}
   </>
  )
}

export default StarRating