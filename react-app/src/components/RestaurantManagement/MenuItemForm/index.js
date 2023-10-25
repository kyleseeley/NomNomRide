import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMenuItem,
  editMenuItem,
  fetchMenuItemsThunk,
} from "../../../store/menuItems";
import { useHistory, useParams } from "react-router-dom";

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

  const typeList = ["Entrees", "Side Dish", "Appetizer", "Dessert"];

  const submitHandler = async (e) => {
    e.preventDefault();

    nameInputValidation();
    priceInputValidation();
    descriptionInputValidation();

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
      history.push(`/${restaurantId}/manage/items`);
    } else {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };

  const nameInputValidation = () => {
    if (name === undefined || name.length === 0) {
      setNameError("Name is required.");
    } else if (name.length > 255) {
      setNameError("Name is too long.");
    } else {
      setNameError(null);
    }
  };

  const priceInputValidation = () => {
    if (price === undefined || price.length === 0) {
      setPriceError("Price is required.");
    } else if (price < 0) {
      setPriceError("Price should be more than 0.");
    } else {
      setPriceError(null);
    }
  };
  const descriptionInputValidation = () => {
    if (description === undefined || description.length === 0) {
      setDescriptionError("Description is required.");
    } else if (price > 255) {
      setDescriptionError("Description is too long.");
    } else {
      setDescriptionError(null);
    }
  };

  return (
    <div className="page-container">
      <div className="login-form-container">
        <div className=" form-wrapper">
          <div className="login-form">
            {itemId === undefined && <h1>Create New Item</h1>}
            {itemId !== undefined && <h1>Edit Item</h1>}
            <table>
              <tr>
                <td>
                  {" "}
                  <label>Name</label>
                </td>
                <td>
                  {" "}
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
                  {" "}
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
                    }}
                    onBlur={() => {
                      priceInputValidation();
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
                  {" "}
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onBlur={() => {
                      descriptionInputValidation();
                    }}
                  />
                  {descriptionError !== null && (
                    <div className="error">{descriptionError}</div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
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

            <button className="cart-button" onClick={submitHandler}>Submit</button>
            <button className="login-button" onClick={()=>history.goBack()}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemForm;
