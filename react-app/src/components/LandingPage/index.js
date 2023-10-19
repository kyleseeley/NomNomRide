import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { fetchRestaurants } from "../../store/restaurant";
import "./LandingPage.css";
import SideBar from "./SideBar";

const LandingPage = () => {
  const dispatch = useDispatch();

  const allRestaurants =
    useSelector((state) => state.restaurant.allRestaurants) || [];
  const restaurantList = Object.values(allRestaurants);

  const [sortCriteria, setSortCriteria] = useState("rating");
  const [shouldSortOnSubmit, setShouldSortOnSubmit] = useState(false);

  const sortRestaurants = (criteria) => {
    setShouldSortOnSubmit(true);
    setSortCriteria(criteria);
  };

  const sortedRestaurants = [...restaurantList];
  if (shouldSortOnSubmit) {
    if (sortCriteria === "rating") {
      sortedRestaurants.sort((a, b) => b.starRating - a.starRating);
    } else if (sortCriteria === "popularity") {
      sortedRestaurants.sort((a, b) => b.numReviews - a.numReviews);
    } else if (sortCriteria === "priceRange") {
      sortedRestaurants.sort(
        (a, b) => b.mostExpensiveMenuItem - a.mostExpensiveMenuItem
      );
    }
  }

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <h1>All Restaurants</h1>
      <div className="landing-content">
        <div className="sidebar">
          <SideBar onSort={sortRestaurants} />
        </div>
        {allRestaurants ? (
          sortedRestaurants.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="restaurant-list">
              {sortedRestaurants.map((restaurant) => (
                <Link
                  to={`/${restaurant.id}`}
                  key={restaurant.id}
                  className="restaurant-card"
                >
                  <div className="restaurant-image">
                    <img src={restaurant.image} alt="Preview" />
                  </div>
                  <div className="restaurant-info">
                    <p className="restaurant-name">
                      {restaurant.name} ({restaurant.address})
                    </p>
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
    </div>
  );
};

export default LandingPage;
