import { csrfFetch } from "./csrf";

export const RESTAURANT_REVIEWS = "reviews/RESTAURANT_REVIEWS";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";
export const USER_REVIEWS = "reviews/USER_REVIEWS";

export const restaurantReviews = (restaurantId, reviews) => ({
  type: RESTAURANT_REVIEWS,
  restaurantId,
  reviews,
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const userReviews = (reviews) => ({
  type: USER_REVIEWS,
  reviews,
});

export const fetchReviews = (restaurantId) => async (dispatch) => {
  try {
    const response = await csrfFetch(
      `/api/restaurants/${restaurantId}/reviews`
    );

    if (!response.ok) {
      throw new Error("Error fetching reviews");
    }

    const responseData = await response.json();
    dispatch(restaurantReviews(restaurantId, responseData.reviews));
  } catch (error) {
    console.log("Error fetching reviews", error);
  }
};

export const createNewReview = (reviewData) => async (dispatch) => {
  console.log("reviewData", reviewData);
  try {
    const response = await csrfFetch(
      `/api/restaurants/${reviewData.restaurantId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: reviewData.review,
          stars: reviewData.stars,
        }),
      }
    );
    console.log("response", response);
    if (!response.ok) {
      throw new Error("Error creating a new review");
    }

    const responseData = await response.json();
    dispatch(createReview(responseData.review));
    dispatch(fetchReviews(responseData.restaurantId));
  } catch (error) {
    console.log("Error creating a new review", error);
  }
};

export const updateUserReview =
  (reviewId, updatedReviewData) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReviewData),
      });

      if (!response.ok) {
        throw new Error("Error updating review");
      }

      const updatedReview = await response.json();
      console.log("updatedReview", updateReview);

      dispatch(updateReview(updatedReview));
      dispatch(fetchReviews(updatedReviewData.restaurantId));

      return updatedReview;
    } catch (error) {
      console.log("Error updating review", error);
    }
  };

export const deleteReviewById =
  (reviewId, restaurantId) => async (dispatch) => {
    console.log("seeing if there is a response");
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Error deleting review");
      }

      dispatch(deleteReview(reviewId));
      dispatch(fetchReviews(restaurantId));

      console.log("review deleted successfully");
    } catch (error) {
      console.log("Error deleting review", error);
    }
  };

export const fetchUserReviews = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/session/reviews`);
    if (!response.ok) {
      throw new Error("Erorr fetching user reviews");
    }
    const responseData = await response.json();
    const reviewsFromUser = responseData.reviews || [];
    dispatch(userReviews(reviewsFromUser));
  } catch (error) {
    console.log("Error fetching user reviews", error);
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RESTAURANT_REVIEWS:
      const { restaurantId, reviews } = action;
      return {
        ...newState,
        [restaurantId]: reviews,
      };
    // newState[restaurantId] = { ...newState[restaurantId] };
    // reviews.forEach((review) => {
    //   newState[restaurantId][review.id] = review;
    // });
    // action.reviews.forEach((review) => {
    //   newState[review.id] = review;
    // });
    // return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      console.log("something here");
      delete newState[action.reviewId];
      return newState;
    case USER_REVIEWS:
      action.reviews.forEach((review) => {
        if (!newState[review.id]) {
          newState[review.id] = review;
        }
      });
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
