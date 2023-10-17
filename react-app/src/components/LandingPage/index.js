import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRestaurants } from "../../store/restaurant";
import "./LandingPage.css";

const LandingPage = () => {
    const dispatch = useDispatch();

    const allRestaurants = useSelector((state) => state.restaurant.allRestaurants) || []
    console.log("all restaurants", allRestaurants)

    useEffect(() => {
        dispatch(fetchRestaurants())
    }, [dispatch])

    return (
        <div className="landing-page">
          <h1>All Restaurants</h1>
          {allRestaurants.restaurants ? (
            allRestaurants.restaurants.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <div className="restaurant-list">
                {allRestaurants.restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="restaurant-card">
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.starRating}</p>
                    <Link to={`/restaurants/${restaurant.id}`}>View Details</Link>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

export default LandingPage;