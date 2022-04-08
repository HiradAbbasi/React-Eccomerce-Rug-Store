import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "./firebase";
import StarRating from './StarRating'
import ReadOnlyStarsRating from './ReadOnlyStarsRating';
import moment from 'moment'

const CommentsAndReviews = () => {
  const { id } = useParams();
  const [rating, setRating] = useState();
  const [reviewUser, setReviewUser] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    db.collection('products').doc(id).collection('reviews').onSnapshot(doc => {
      let tempReviews = [];
      doc.forEach(review => {
        tempReviews.push(review.data());
      })
      setReviews(tempReviews);
    })
  }, []);

  const reviewRating = (rating) => {
    setRating(rating);
  }

  const submitReview = (e) => {
    e.preventDefault();
    document.querySelector('.review-form').reset();

    db.collection('products').doc(id).collection('reviews').doc().set({
      uploadDate: moment().format('LL'),
      rating: rating > 0 ? rating : 1,
      user: reviewUser.user,
      email: reviewUser.userEmail,
      comment: reviewUser.comment,
      itemId: id,
    })

    if(auth.currentUser){
      db.collection('users').doc(auth.currentUser.uid).collection('reviews').doc().set({
        uploadDate: moment().format('LL'),
        rating: rating > 0 ? rating : 1,
        user: reviewUser.user,
        email: reviewUser.userEmail,
        comment: reviewUser.comment,
        itemId: id,
      })
    }

    setRating("");
    setReviewUser("");
  }

  const updateField = (e) => {
    e.persist();
    setReviewUser(prevInputs => ({...prevInputs, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <nav class="nav nav-pills nav-justified" style={{maxWidth: '1300px', margin: '0 auto', padding: '0 15px'}}>
        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">DESCRIPTION</a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">INFORMATION</a>
        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="true">REVIEWS ({reviews && reviews.length})</a>
      </nav>
      <div class="tab-content" id="nav-tabContent" style={{maxWidth: '1300px', margin: '0 auto', padding: '0 15px'}}>
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"></div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"></div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">      
          <section className="reviews-container">
            <div className="total-reviews-container">
              {reviews && (reviews.length > 1 ? <h4 className="total-reviews-counter"> {reviews.length} Reviews</h4> : <h4 className="total-reviews-counter"> {reviews.length} Review</h4>)}
              <ul className="reviews-ul">
                <li>
                  <h4>5 Stars</h4>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: `${(reviews && reviews.reduce((counter, currentNumber)=> (5 === currentNumber.rating ? counter+1 : counter),0) / reviews.length) * 100}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4>({reviews && reviews.reduce((counter, currentNumber)=> (5 === currentNumber.rating ? counter+1 : counter),0)})</h4>
                </li>
                <li>
                  <h4>4 Stars</h4>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: `${(reviews && reviews.reduce((counter, currentNumber)=> (4 === currentNumber.rating ? counter+1 : counter),0) / reviews.length) * 100}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4>({reviews && reviews.reduce((counter, currentNumber)=> (4 === currentNumber.rating ? counter+1 : counter),0)})</h4>
                </li>
                <li>
                  <h4>3 Stars</h4>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: `${(reviews && reviews.reduce((counter, currentNumber)=> (3 === currentNumber.rating ? counter+1 : counter),0) / reviews.length) * 100}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4>({reviews && reviews.reduce((counter, currentNumber)=> (3 === currentNumber.rating ? counter+1 : counter),0)})</h4>
                </li>
                <li>
                  <h4>2 Stars</h4>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: `${(reviews && reviews.reduce((counter, currentNumber)=> (2 === currentNumber.rating ? counter+1 : counter),0) / reviews.length) * 100}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4>({reviews && reviews.reduce((counter, currentNumber)=> (2 === currentNumber.rating ? counter+1 : counter),0)})</h4>
                </li>
                <li>
                  <h4>1 Stars</h4>
                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: `${(reviews && reviews.reduce((counter, currentNumber)=> (1 === currentNumber.rating ? counter+1 : counter),0) / reviews.length) * 100}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <h4>({reviews && reviews.reduce((counter, currentNumber)=> (1 === currentNumber.rating ? counter+1 : counter),0)})</h4>
                </li>
              </ul>
            </div>
            <div class="user-reviews">
              <ul class="user-review-container">
                {reviews && reviews.map((review,index) => {
                  return (<li class="review" key={index}>
                    <div className="profile-img">{review.user.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</div>
                    <div className="review-profile-name-comment">
                      <h5>{review.user}<span className="review-profile-light"> - {review.uploadDate}</span></h5>
                      <h6>{review.comment}</h6>
                    </div>
                    <ReadOnlyStarsRating rating={review.rating} size={20}/>
                  </li>)
                })}
                <section class="add-review">
                  <div class="form-group">
                    <form onSubmit={submitReview} className="review-form">
                      <h4 className="mb-3">Leave a review <br/><br/><StarRating reviewRating={reviewRating}/></h4> 
                      <label>Name</label>
                      <input type="text" class="form-control mb-3"  placeholder="John Smith" name="user" value={reviewRating.user} onChange={updateField}  required/>
                      <label>Email</label>
                      <input type="email" class="form-control mb-3" placeholder="name@example.com" name="userEmail" value={reviewRating.userEmail} onChange={updateField} required/>
                      <label>Comment</label>
                      <textarea class="form-control mb-3" rows="5" maxLength="500" name="comment" value={reviewRating.comment} onChange={updateField} required></textarea>
                      <button type="submit" class="btn btn-primary">Add review</button>
                    </form>
                  </div>
                </section>
              </ul> 
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CommentsAndReviews;