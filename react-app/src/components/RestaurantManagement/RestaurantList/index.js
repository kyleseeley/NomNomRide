import React, { useEffect } from "react";
import { fetchRestaurantsByOwner } from "../../../store/restaurant";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../../context/Sidebar";
const RestaurantList = () => {
  const { setIsSidebarVisible } = useSidebarContext();
  const ownerId = useSelector((storeState) => storeState.session.user?.id);
  const allRestaurants = useSelector((storeState) => storeState.restaurant);
  const restaurantsOwnedByUser = Object.values(allRestaurants).filter(
    (restaurant) => restaurant.ownerId === ownerId
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRestaurantsByOwner());
  }, [dispatch]);
  return (
    <div>
      <div>restaurants list</div>
      {restaurantsOwnedByUser.map((restaurant) => (
        <div>
          <Link
            to={`/${restaurant.id}/manage`}
            onClick={() => setIsSidebarVisible(false)}
          >
            {restaurant.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
