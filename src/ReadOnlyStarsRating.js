import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'

const ReadOnlyStarsRating = (props) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setRating(props.rating);
  },[])

  return (
    <div className="star-rating-width">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} >
            <input type="radio" name="rating" class="radio-hide" value={props.rating}></input>
            <FaStar
              className="star" 
              size={props.size} 
              color={ ratingValue <= props.rating ? "#ffc107" : "#495057"} 
            />
          </label>
        )
      })}
    </div>
  )
}

export default ReadOnlyStarsRating