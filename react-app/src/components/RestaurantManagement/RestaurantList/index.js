import React, { useEffect,  } from "react";
import { fetchRestaurantsByOwner } from "../../../store/restaurant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const RestaurantList = () => {
  const ownerId = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRestaurantsByOwner());
  }, [dispatch]);
  return <div>restaurants list</div>;
};

export default RestaurantList;
