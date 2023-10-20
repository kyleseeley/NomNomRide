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
  const [type, setType] = useState(item?.type || "Entrees");
  const [price, setPrice] = useState(item?.price || 0);
  const [description, setDescription] = useState(item?.description || "");
  const [image, setImage] = useState(item?.image || "");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchMenuItemsThunk(restaurantId));
  }, [dispatch]);

  useEffect(() => {
    if (item !== undefined) {
      setName(item.name)
      setType(item.type)
      setPrice(item.price)
      setDescription(item.description)
      setImage(item.image)
    }
  }, [item]);
  const submitHandler = async () => {
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
          {/* Todo:spelling/match enum in backend */}
          <option>Entrees</option>
          <option>Appetizer</option>
          <option>Dessert</option>
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
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
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

export default MenuItemForm;
