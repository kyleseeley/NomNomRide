import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRestaurants } from "../../store/restaurant";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  const allRestaurants =
    useSelector((state) => state.restaurant.allRestaurants) || [];

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <h1>All Restaurants</h1>
      {allRestaurants.restaurants ? (
        allRestaurants.restaurants.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="restaurant-list">
            {allRestaurants.restaurants.map((restaurant) => (
              <Link
                to={`/${restaurant.id}`}
                key={restaurant.id}
                className="restaurant-card"
              >
                <div className="restaurant-image">
                  <img src={restaurant.image} alt="Preview" />
                </div>
                <div className="restaurant-info">
                  <p className="restaurant-name">{restaurant.name}</p>
                  <p className="restaurant-rating">{restaurant.starRating}</p>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LandingPage;
