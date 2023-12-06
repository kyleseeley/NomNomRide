import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";
import * as reviewActions from "../../store/reviews";

const ReviewModal = ({ restaurantId, onClose, editReview }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  useEffect(() => {
    if (editReview) {
      setReview(editReview.review);
      setStars(editReview.stars);
    }
  }, [editReview]);

  const handleStarChange = (selectedStars) => {
    setStars(selectedStars);
  };

  const resetModalState = () => {
    setReview("");
    setStars(0);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
      restaurantId,
    };

    if (editReview) {
      dispatch(reviewActions.updateUserReview(editReview.id, newReview))
        .then((updatedReview) => {
          resetModalState();
          closeModal();
        })
        .catch((error) => {
          const data = error.response.data;
          if (data && data.message) {
            setErrors({ credential: data.message });
          }
        });
    } else {
      try {
        dispatch(reviewActions.createNewReview(newReview));
        resetModalState();
        closeModal();
      } catch (error) {
        const data = error.response.data;
        if (data && data.message) {
          setErrors({ credential: data.message });
        }
      }
    }
  };

  const isButtonDisabled = review.length < 10 || stars <= 0;

  return (
    <div className="review-modal">
      <h2 className="modal-heading">
        {editReview ? "Edit Your Review" : "How was the food?"}
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="text-area"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
          rows={4}
          required
        />
        <label className="star-rating-label">
          {/* Rate your stay: */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= stars ? "selected" : ""}`}
                onClick={() => handleStarChange(value)}
              >
                <i className="fa-solid fa-star"></i>
              </span>
            ))}
          </div>
          <span className="star-name">Stars</span>
        </label>

        <button type="submit" disabled={isButtonDisabled}>
          {editReview ? "Update Your Review" : "Submit your review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewModal;
