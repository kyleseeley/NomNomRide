import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneRestaurant,
  createNewRestaurant,
  updateRestaurant,
} from "../../../store/restaurant";
import { useHistory, useParams } from "react-router-dom";

const typeList = [
  "Chinese",
  "American",
  "Fast Food",
  "Mexican",
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
];

const RestaurantForm = ({ restaurant, onSubmit }) => {
  const [name, setName] = useState(restaurant?.name || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [city, setCity] = useState(restaurant?.city || "");
  const [state, setState] = useState(restaurant?.state || "");
  const [lat, setLat] = useState(restaurant?.lat || "");
  const [lng, setLng] = useState(restaurant?.lng || "");
  const [type, setType] = useState(restaurant?.type || "American");
  const [image, setImage] = useState(restaurant?.image || "");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async () => {
    let errors;
    if (restaurant !== undefined) {
      //editing
      errors = await dispatch(
        updateRestaurant(
          restaurant.id,
          address,
          city,
          state,
          lat,
          lng,
          name,
          type,
          image
        )
      );
      if (!errors && typeof onSubmit === "function") {
        onSubmit();
      }
    } else {
      //creation
      const id = await dispatch(
        createNewRestaurant(address, city, state, lat, lng, name, type, image)
      );
      if (id) {
        history.push(`/${id}/manage`);
      }
    }
    if (errors) {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };
  return (
    <div className="page-container">
      {restaurant === undefined && <h1>Create New Restaurant</h1>}
      {restaurant !== undefined && <h1>Edit Restaurant</h1>}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {typeList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Latitude</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => {
            setLat(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Longtitude</label>
        <input
          type="number"
          value={lng}
          onChange={(e) => {
            setLng(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};

export default RestaurantForm;
