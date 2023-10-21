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
  const [nameError, setNameError] = useState(null);
  const [address, setAddress] = useState(restaurant?.address || "");
  const [addressError, setAddressError] = useState(null);
  const [city, setCity] = useState(restaurant?.city || "");
  const [cityError, setCityError] = useState(null);
  const [state, setState] = useState(restaurant?.state || "");
  const [stateError, setStateError] = useState(null);
  const [lat, setLat] = useState(restaurant?.lat || "");
  const [latError, setLatError] = useState(null);
  const [lng, setLng] = useState(restaurant?.lng || "");
  const [lngError, setLngError] = useState(null);
  const [type, setType] = useState(restaurant?.type || "American");
  const [typeError, setTypeError] = useState(restaurant?.type || "American");
  const [image, setImage] = useState(restaurant?.image || "");
  const [imageError, setImageError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    nameInputValidation();
    addressInputValidation();
    cityInputValidation();
    stateInputValidation();
    latInputValidation();
    lngInputValidation();
    typeInputValidation();
    imageInputValidation();

    if (
      nameError ||
      addressError ||
      cityError ||
      stateError ||
      latError ||
      lngError ||
      imageError
    ) {
      return;
    }

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
      console.log("Errors after editing:", errors);

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
    console.log("Errors after creation:", errors);

    if (errors) {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };

  const nameInputValidation = () => {
    if (name === undefined || name.length === 0) {
      setNameError("Name is required.");
    } else if (name.length > 40) {
      setNameError("Name is too long.");
    } else {
      setNameError(null);
    }
  };
  const addressInputValidation = () => {
    if (address === undefined || address.length === 0) {
      setAddressError("Address is required.");
    } else if (address.length > 50) {
      setAddressError("Address is too long.");
    } else {
      setAddressError(null);
    }
  };
  const cityInputValidation = () => {
    if (city === undefined || city.length === 0) {
      setCityError("City is required.");
    } else if (city.length > 50) {
      setCityError("City Name is too long.");
    } else {
      setCityError(null);
    }
  };
  const stateInputValidation = () => {
    if (state === undefined || state.length === 0) {
      setStateError("State is required.");
    } else {
      setStateError(null);
    }
  };
  const latInputValidation = () => {
    if (lat === undefined || lat.length === 0) {
      setLatError("Latitude is required.");
    } else if (lat > 90 || lat < -90) {
      setLatError("Latitude must be between -90 to 90.");
    } else {
      setLatError(null);
    }
  };
  const lngInputValidation = () => {
    if (lng === undefined || lng.length === 0) {
      setLngError("Longitude is required.");
    } else if (lng > 180 || lng < -180) {
      setLngError("Longitude must be between -180 to 180.");
    } else {
      setLngError(null);
    }
  };
  const typeInputValidation = () => {
    if (type === undefined || type.length === 0) {
      setTypeError("Type is required");
    } else {
      setTypeError(null);
    }
  };
  const imageInputValidation = () => {
    if (image === undefined || image.length === 0) {
      setImageError("Image is required.");
    } else {
      setImageError(null);
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
          onBlur={() => {
            nameInputValidation();
          }}
        />
        {nameError !== null && <div className="error">{nameError}</div>}
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
        {typeError !== null && <div className="error">{typeError}</div>}
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          onBlur={() => {
            addressInputValidation();
          }}
        />
        {addressError !== null && <div className="error">{addressError}</div>}
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onBlur={() => {
            cityInputValidation();
          }}
        />
        {cityError !== null && <div className="error">{cityError}</div>}
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          onBlur={() => {
            stateInputValidation();
          }}
        />
        {stateError !== null && <div className="error">{stateError}</div>}
      </div>
      <div>
        <label>Latitude</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => {
            setLat(e.target.value);
          }}
          onBlur={() => {
            latInputValidation();
          }}
        />
        {latError !== null && <div className="error">{latError}</div>}
      </div>
      <div>
        <label>Longtitude</label>
        <input
          type="number"
          value={lng}
          onChange={(e) => {
            setLng(e.target.value);
          }}
          onBlur={() => {
            lngInputValidation();
          }}
        />
        {lngError !== null && <div className="error">{lngError}</div>}
      </div>
      <div>
        <label>Image</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
          onBlur={() => {
            imageInputValidation();
          }}
        />
        {imageError !== null && <div className="error">{imageError}</div>}
      </div>
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};

export default RestaurantForm;
