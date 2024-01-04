import "./RestaurantDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneRestaurant } from "../../store/restaurant";
import { fetchMenuItemsThunk } from "../../store/menuItems";
import { fetchReviews, deleteReviewById } from "../../store/reviews";
import { fetchUserOrders } from "../../store/session";
import { getKey } from "../../store/maps";
import ItemList from "../Item/ItemList";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import ReviewModal from "../ReviewModal";
import OpenModalButton from "../OpenModalButton";
import MapContainerModal from "../maps";
import { reviewsChanged } from "../../store/reviews";

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurant[restaurantId]);
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.session.orders);
  const restaurantReviews = useSelector((state) => state.reviews[restaurantId]);
  const [focusTab, setFocusTab] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState({});
  const reviewsArray = restaurantReviews
    ? Object.values(restaurantReviews)
    : [];
  const { setModalContent } = useModal();

  const hasLeftReview =
    user &&
    reviewsArray.some((review) => {
      return (
        review.userId === user.id && review.restaurantId === restaurant?.id
      );
    });

  console.log("hasLeftReview", hasLeftReview);

  const hasOrdered =
    user &&
    restaurant &&
    orders?.some((order) => order.restaurantId === restaurant?.id);

  console.log("hasOrdered", hasOrdered);
  console.log("orders", orders);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchOneRestaurant(restaurantId))
      .then(() => dispatch(fetchMenuItemsThunk(restaurantId)))
      .then((menuItems) => {
        const tempCat = {};
        for (const item of menuItems) {
          if (!tempCat[item.type]) tempCat[item.type] = [item];
          else tempCat[item.type] = [...tempCat[item.type], item];
        }
        setCategories(tempCat);
      })
      .then(dispatch(fetchReviews(restaurantId)))
      .then(dispatch(fetchUserOrders()))
      .then(dispatch(getKey()))
      .then(setIsLoaded(true));
  }, [dispatch, restaurantId, user]);

  const scrollToId = (catName) => {
    const element = catName ? document.getElementById(catName) : catName;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
    setFocusTab(catName);
  };

  const calculateTimeAgo = (reviewDate) => {
    const currentTime = new Date();
    const reviewTime = new Date(reviewDate);
    const timeDifference = currentTime - reviewTime;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    if (minutesAgo < 60) {
      return `${minutesAgo} minute(s) ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo < 24) {
        return `${hoursAgo} hour(s) ago`;
      } else {
        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} day(s) ago`;
      }
    }
  };

  const handleEditReview = (review) => {
    setModalContent(
      <ReviewModal
        restaurantId={restaurant?.id}
        editReview={review} // Pass the review data to edit
        onClose={() => setModalContent(null)}
      />
    );
  };

  const calculateStarRating = () => {
    if (restaurantReviews) {
      const totalStars = reviewsArray.reduce(
        (acc, review) => acc + review.stars,
        0
      );
      return totalStars / reviewsArray.length;
    } else {
      return 0;
    }
  };

  if (isLoaded) {
    const updatedStarRating = calculateStarRating();
    const numReviews = reviewsArray.length;
    return (
      <div className="restaurant-page page-container">
        <div
          style={{
            backgroundImage: `url(${restaurant?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="restaurant-banner"
        />
        <div className="header">
          <h1 className="restaurant-name-details">
            {restaurant?.name} ({restaurant?.address})
          </h1>
          <p className="restaurant-details">
            <b>
              {`${restaurant?.type} · `}
            {updatedStarRating ? <i className="fa-solid fa-star" /> : ''}
            {"  "}
              {updatedStarRating ? `${updatedStarRating} (${numReviews} reviews)` : 'New'}
            </b>
            {/* <OpenModalButton
              className="restaurant-more-info"
              buttonText="More Info"
              modalComponent={
                <MapContainerModal
                  restaurant={restaurant}
                />
              }
            /> */}
          </p>
          {restaurant?.ownerId == user?.id && (
            <NavLink
              to={`/${restaurant?.id}/manage`}
              className="details-update-restaurant-link"
            >
              Manage Restaurant
            </NavLink>
          )}
        </div>
        <div className="menu-section">
          <div className="restaurant-page-cat-div">
            {Object.keys(categories).map((category) => {
              return (
                <span
                  key={category}
                  className={`restaurant-page-cat
									${focusTab === category ? "focus" : ""}`}
                  onClick={() => scrollToId(category)}
                >
                  {category}
                </span>
              );
            })}
          </div>
          <div className="cat-section">
            {Object.keys(categories).map((category) => {
              return (
                <ItemList
                  key={category}
                  category={category}
                  items={categories[category]}
                />
              );
            })}
          </div>
        </div>
        <div className="reviews-section">
          {reviewsArray.length ? <h2 className="review-title">Reviews</h2>: 'This restaurant has no reviews so far.'}
          {!hasLeftReview && hasOrdered && (
            <OpenModalButton
              className="leave-review-button"
              buttonText="Leave a Review"
              modalComponent={
                <ReviewModal
                  restaurantId={restaurant?.id}
                  onClose={() => setModalContent(null)}
                />
              }
            />
          )}
          <ul className="reviews-list">
            {reviewsArray.map((review) => (
              <li key={review?.id} className="review-item">
                <p className="review-name">
                  {review?.firstname} {review?.lastname.charAt(0)}.
                </p>
                <p className="review-time">
                  {calculateTimeAgo(review?.createdAt)} ago
                </p>
                <p className="review-rating">{review?.stars} Stars</p>
                <p className="review-content">{review?.review}</p>
                {user?.id === review?.userId && (
                  <button
                    onClick={() => handleEditReview(review)}
                    className="edit-review-button"
                  >
                    Edit Your Review
                  </button>
                )}
                {user?.id === review?.userId && (
                  <OpenModalButton
                    className="delete-review-button"
                    buttonText="Delete Your Review"
                    modalComponent={() => (
                      <div>
                        <h3>Are you sure to delete this review?</h3>
                        <div className="button-container">
                          <button
                            className="yes-button"
                            onClick={() => {
                              dispatch(
                                deleteReviewById(review?.id, restaurantId)
                              );
                              closeModal();
                            }}
                          >
                            Yes
                          </button>
                          <button className="no-button" onClick={closeModal}>
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="restaurant-page page-container">
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="restaurant-banner skeleton"
        />
        <div className="header">
          <h1 className="restaurant-name-details skeleton" />
          <p className="restaurant-details skeleton" />
        </div>
        <div className="menu-section">
          <div className="restaurant-page-cat-div">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
              return (
                <span key={i} className={`restaurant-page-cat`}>
                  <div className="cat-name skeleton"></div>
                </span>
              );
            })}
          </div>
          <div className="cat-section">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
              return <ItemList key={i} skeleton={true} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default RestaurantDetails;
