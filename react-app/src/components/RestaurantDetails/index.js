import "./RestaurantDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneRestaurant } from "../../store/restaurant";
import { fetchMenuItemsThunk } from "../../store/menuItems";
import { fetchReviews } from "../../store/reviews";
import ItemList from "../Item/ItemList";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurant[restaurantId]);
  const user = useSelector((state) => state.session.user);
  const restaurantItems = useSelector((state) => state.menuItems);
  const restaurantReviews = useSelector((state) => state.reviews[restaurantId]);
  const reviewsArray = restaurantReviews
    ? Object.values(restaurantReviews)
    : [];
  const categories = {};
  for (const item of Object.values(restaurantItems)) {
    if (!categories[item.type]) categories[item.type] = [item];
    else categories[item.type] = [...categories[item.type], item];
  }

  const userReviews = useSelector((state) => state.reviews);

  const hasLeftReview =
    user &&
    Object.keys(userReviews).length > 0 &&
    Object.values(userReviews).some((review) => {
      return (
        review &&
        review.userId === user.id &&
        review.restaurantId === restaurant.id
      );
    });

  console.log("user", user);
  console.log("user orders", user.orders);
  const hasOrdered =
    user &&
    restaurant &&
    user.orders?.some((order) => order.restaurantId === restaurant.id);
  console.log("hasOrdered", hasOrdered);

  const [focusTab, setFocusTab] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchOneRestaurant(restaurantId))
      .then(dispatch(fetchMenuItemsThunk(restaurantId)))
      .then(dispatch(fetchReviews(restaurantId)))
      .then()
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

  // if link name is invalid, catch all
  // if (restaurant.dne) return (
  // 	<div className='unavailable'>
  // 		<h1>Sorry, this page isn't available.</h1>
  // 		<p>The link you followed may be broken, or the page may have been removed.</p>
  // 	</div>
  // )
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
        <h1 className="restaurant-name">
          {restaurant?.name} ({restaurant?.address})
        </h1>
        <p className="restaurant-details">
          <i className="fa-solid fa-star" />
          &nbsp;{" "}
          <b>
            {restaurant?.starRating} ({restaurant?.numReviews} ratings)
          </b>
        </p>
      </div>
      {restaurant?.ownerId == user?.id && (
        <NavLink to={`/${restaurant.id}/manage`}>Update Restaurant</NavLink>
      )}
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
        <h2 className="review-title">Reviews</h2>
        {!hasLeftReview && hasOrdered && (
          <button className="leave-review-button">Leave a Review</button>
        )}
        <ul className="reviews-list">
          {reviewsArray.map((review) => (
            <li key={review.id} className="review-item">
              <p className="review-name">
                {review.firstname} {review.lastname.charAt(0)}.
              </p>
              <p className="review-time">
                {calculateTimeAgo(review.createdAt)} ago
              </p>
              <p className="review-rating">{review.stars} Stars</p>
              <p className="review-content">{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetails;
