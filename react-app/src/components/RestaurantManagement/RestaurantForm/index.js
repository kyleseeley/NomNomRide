import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewRestaurant,
  updateRestaurant,
} from "../../../store/restaurant";
import { useHistory } from "react-router-dom";
import "./RestaurantForm.css";
import { displayAlert } from "../../../store/alert";
import RequestPendingAndFinish from "../../Animations/RequestPendingAndFinish";

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

const RestaurantForm = ({ restaurant, onFinish }) => {
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
  const [typeError, setTypeError] = useState(null);
  const [image, setImage] = useState(restaurant?.image || "");
  const [imageError, setImageError] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const isCreatePending = useSelector(
    (state) => state.restaurant.create?.pending
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsSubmitDisabled(
      nameError ||
        addressError ||
        cityError ||
        stateError ||
        latError ||
        lngError ||
        imageError
    );
  }, [
    name,
    address,
    city,
    state,
    lat,
    lng,
    image,
    nameError,
    addressError,
    cityError,
    stateError,
    latError,
    lngError,
    imageError,
  ]);

  useEffect(() => {
    if (restaurant === undefined) {
      setIsSubmitDisabled(true);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    nameInputValidation(name);
    addressInputValidation(address);
    cityInputValidation(city);
    stateInputValidation(state);
    latInputValidation(lat);
    lngInputValidation(lng);
    typeInputValidation(type);
    imageInputValidation(image);

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

      if (!errors && typeof onFinish === "function") {
        dispatch(displayAlert("Restaurant Updated"));
        onFinish();
      }
    } else {
      //creation
      setShowAnimation(true);
      const id = await dispatch(
        createNewRestaurant(address, city, state, lat, lng, name, type, image)
      );
      if (id) {
        dispatch(displayAlert("Restaurant Created"));
        setCreatedId(id);
      }
    }

    if (errors) {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };

  const cancelHandler = () => {
    //if editing
    if (typeof onFinish === "function") {
      onFinish();
    } else {
      //creating
      history.goBack();
    }
  };

  const nameInputValidation = (checkName) => {
    if (checkName === undefined || checkName.length === 0) {
      setNameError("Name is required.");
    } else if (name.length > 40) {
      setNameError("Name is too long.");
    } else {
      setNameError(null);
    }
  };
  const addressInputValidation = (checkAddress) => {
    if (checkAddress === undefined || checkAddress.length === 0) {
      setAddressError("Address is required.");
    } else if (address.length > 50) {
      setAddressError("Address is too long.");
    } else {
      setAddressError(null);
    }
  };
  const cityInputValidation = (checkCity) => {
    if (checkCity === undefined || checkCity.length === 0) {
      setCityError("City is required.");
    } else if (city.length > 50) {
      setCityError("City Name is too long.");
    } else {
      setCityError(null);
    }
  };
  const stateInputValidation = (checkState) => {
    if (checkState === undefined || checkState.length === 0) {
      setStateError("State is required.");
    } else {
      setStateError(null);
    }
  };
  const latInputValidation = (checkLat) => {
    if (checkLat === undefined || checkLat.length === 0) {
      setLatError("Latitude is required.");
    } else if (lat > 90 || lat < -90) {
      setLatError("Latitude must be between -90 to 90.");
    } else {
      setLatError(null);
    }
  };
  const lngInputValidation = (checkLng) => {
    if (checkLng === undefined || checkLng.length === 0) {
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
  const imageInputValidation = (checkImage) => {
    if (checkImage === undefined || checkImage.length === 0) {
      setImageError("Image is required.");
    } else {
      setImageError(null);
    }
  };

  return (
    <div className={restaurant === undefined ? "page-container" : ""}>
      <div className="login-form-container">
        {showAnimation && (
          <div className="form-wrapper">
            <RequestPendingAndFinish
              pending={isCreatePending}
              onAnimationComplete={() => {
                history.push(`/${createdId}/manage`);
              }}
            />
          </div>
        )}

        {!showAnimation && (
          <div className="form-wrapper">
            {restaurant === undefined && <h1>Create New Restaurant</h1>}
            {restaurant !== undefined && <h1>Edit Restaurant</h1>}
            <table>
              <tr>
                <td>
                  <label>Name</label>
                </td>

                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      nameInputValidation(e.target.value);
                    }}
                  />
                  {nameError !== null && (
                    <div className="error">{nameError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Type</label>
                </td>
                <td>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    className="select"
                  >
                    {typeList.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {typeError !== null && (
                    <div className="error">{typeError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Address</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      addressInputValidation(e.target.value);
                    }}
                  />
                  {addressError !== null && (
                    <div className="error">{addressError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label>City</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      cityInputValidation(e.target.value);
                    }}
                  />
                  {cityError !== null && (
                    <div className="error">{cityError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label>State</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      stateInputValidation(e.target.value);
                    }}
                  />
                  {stateError !== null && (
                    <div className="error">{stateError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Latitude</label>
                </td>
                <td>
                  <input
                    type="number"
                    value={lat}
                    onChange={(e) => {
                      setLat(e.target.value);
                      latInputValidation(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const invalidChars = ["+", "e"];
                      if (invalidChars.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {latError !== null && <div className="error">{latError}</div>}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Longtitude</label>
                </td>
                <td>
                  <input
                    type="number"
                    value={lng}
                    onChange={(e) => {
                      setLng(e.target.value);
                      lngInputValidation(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const invalidChars = ["+", "e"];
                      if (invalidChars.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {lngError !== null && <div className="error">{lngError}</div>}
                </td>
              </tr>
              <tr>
                <td>
                  <label>Image</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      imageInputValidation(e.target.value);
                    }}
                  />
                  {imageError !== null && (
                    <div className="error">{imageError}</div>
                  )}
                </td>
              </tr>
            </table>
            <div className="submit">
              <button
                className="cart-button"
                disabled={isSubmitDisabled}
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
            <div className="cancel-button">
              <button className="login-button" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantForm;
