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
    e.preventDefault()
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
      {itemId === undefined && <h1>Create New Item</h1>}
      {itemId !== undefined && <h1>Edit Item</h1>}
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
        {nameError !== null && <div>{nameError}</div>}
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
        <label>Price</label>
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
      </div>
      {priceError !== null && <div>{priceError}</div>}
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={() => {
            descriptionInputValidation();
          }}
        />
      </div>
      {descriptionError !== null && <div>{descriptionError}</div>}
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

export default MenuItemForm;
