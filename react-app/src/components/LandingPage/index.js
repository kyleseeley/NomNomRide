import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRestaurants } from "../../store/restaurant";
import "./LandingPage.css";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const LandingPage = () => {
  const dispatch = useDispatch();

  const allRestaurants = useSelector((state) => state.restaurant) || [];
  const restaurantList = Object.values(allRestaurants);

  const [sortCriteria, setSortCriteria] = useState("rating");
  const [shouldSortOnSubmit, setShouldSortOnSubmit] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)

  const sortRestaurants = (criteria) => {
    setShouldSortOnSubmit(true);
    setSortCriteria(criteria);
  };

  const filteredRestaurants = selectedType
    ? restaurantList.filter((restaurant) => restaurant.type === selectedType)
    : restaurantList;

  const sortedRestaurants = [...filteredRestaurants];

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
    dispatch(fetchRestaurants())
    .then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <div className="landing-page">
      <TopBar
        types={[
          "Mexican",
          "American",
          "Fast Food",
          "Chinese",
          "Pizza",
          "Sushi",
          "Thai",
          "Burgers",
          "Indian",
          "Wings",
          "Italian",
          "BBQ",
          "Vegan",
          "Sandwich",
        ]}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
      />
      <h1>All Restaurants</h1>
      <div className="landing-content">
        <div className="sidebar">
          <SideBar onSort={sortRestaurants} />
        </div>
        {isLoaded ? (
          sortedRestaurants.length === 0 ? (
            <p>There are no restaurants of this type.</p>
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
          <div className="restaurant-list">
              {Array.from({length: 16}, (_, i) => i + 1).map(i => (
                <div key={i} className="restaurant-card">
                  <div className="restaurant-image skeleton" />
                  <div className="restaurant-info">
                    <p className="restaurant-name skeleton" />
                    <p className="restaurant-rating skeleton" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
