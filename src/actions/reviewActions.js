// src/actions/reviewActions.js
import actionTypes from '../constants/actionTypes';

export function reviewAdded(review) {
  return { type: actionTypes.ADD_REVIEW, review };
}

export function submitReview({ movieId, rating, comment }) {
  return dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ movieId, rating, comment })
    })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(newReview => {
      dispatch(reviewAdded(newReview));
      return newReview;
    });
  };
}
