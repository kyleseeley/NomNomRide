import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMenuItem,
  editMenuItem,
  fetchMenuItemsThunk,
} from "../../../store/menuItems";
import { useHistory, useParams } from "react-router-dom";
import "./MenuItemForm.css";
import { displayAlert } from "../../../store/alert";

const MenuItemForm = () => {
  const { restaurantId, itemId } = useParams();
  const item = useSelector((state) => state.menuItems[itemId]);

  const [name, setName] = useState(item?.name || "");
  const [nameError, setNameError] = useState(null);
  const [type, setType] = useState(item?.type || "Entrees");
  const [price, setPrice] = useState(item?.price || 0);
  const [priceError, setPriceError] = useState(null);
  const [description, setDescription] = useState(item?.description || "");
  const [descriptionError, setDescriptionError] = useState(null);
  const [image, setImage] = useState(item?.image || "");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMenuItemsThunk(restaurantId));
  }, [dispatch]);

  useEffect(() => {
    if (item !== undefined) {
      setName(item.name);
      setType(item.type);
      setPrice(item.price);
      setDescription(item.description);
      setImage(item.image);
    }
  }, [item]);
  
  useEffect(() => {
    setIsSubmitDisabled(nameError || priceError || descriptionError);
  }, [name, price, description, nameError, priceError, descriptionError]);

  useEffect(() => {
    if (item === undefined) {
      setIsSubmitDisabled(true);
    }
  }, []);

  const typeList = ["Entrees", "Side Dish", "Appetizer", "Dessert"];

  const submitHandler = async (e) => {
    e.preventDefault();

    nameInputValidation(name);
    priceInputValidation(price);
    descriptionInputValidation(description);

    if (nameError || priceError || descriptionError) {
      return;
    }
    let errors;
    if (itemId !== undefined) {
      //editing
      errors = await dispatch(
        editMenuItem({
          id: itemId,
          restaurantId,
          name,
          type,
          price,
          description,
          image,
        })
      );
    } else {
      //creation
      errors = await dispatch(
        createMenuItem(restaurantId, name, type, price, description, image)
      );
    }

    if (!errors) {
      dispatch(
        displayAlert(itemId !== undefined ? "Item Edited" : "Item Created")
      );
      history.push(`/${restaurantId}/manage/items`);
    } else {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };

  const nameInputValidation = (checkName) => {
    if ( checkName=== undefined || checkName.length === 0) {
      setNameError("Name is required.");
    } else if (checkName.length > 255) {
      setNameError("Name is too long.");
    } else {
      setNameError(null);
    }
  };

  const priceInputValidation = (checkPrice) => {
    if (checkPrice === "") {
      setPriceError("Price is required.");
    } else if (checkPrice <= 0) {
      setPriceError("Price should be more than 0.");
    } else {
      setPriceError(null);
    }
  };

  const descriptionInputValidation = (checkDescription) => {
    if (checkDescription === undefined || checkDescription.length === 0) {
      setDescriptionError("Description is required.");
    } else if (checkDescription.length > 255) {
      setDescriptionError("Description is too long.");
    } else {
      setDescriptionError(null);
    }
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <div className=" form-wrapper">
          {itemId === undefined && <h1>Create New Item</h1>}
          {itemId !== undefined && <h1>Edit Item</h1>}
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
                {nameError !== null && <div className="error">{nameError}</div>}
              </td>
            </tr>
            <tr>
              <td>
                <label>Type</label>
              </td>
              <td>
                <select
                  className="select"
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
              </td>
            </tr>
            <tr>
              <td>
                <label>Price</label>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    priceInputValidation(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    const invalidChars = ["-", "+", "e","E"];
                    if (invalidChars.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}

                />
                {priceError !== null && (
                  <div className="error">{priceError}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    descriptionInputValidation(e.target.value);
                  }}
                />
                {descriptionError !== null && (
                  <div className="error">{descriptionError}</div>
                )}
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
                  }}
                />
              </td>
            </tr>
          </table>
          <div className="submit">
            <button
              className="cart-button auto-width"
              disabled={isSubmitDisabled}
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
          <div className="cancel-button">
            <button
              className="login-button auto-width"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemForm;
