import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMenuItem } from "../../../store/menuItems";
import { useHistory, useParams } from "react-router-dom";
const NewMenuItem = () => {
  const { restaurantId } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("entree");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = async () => {
    const errors = await dispatch(
      createMenuItem(restaurantId, name, type, price, description, image)
    );
    if (!errors) {
      history.push(`/restaurants/${restaurantId}/menuItems`);
    } else {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating menu item:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };
  return (
    <div className="menu-item-container">
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
          <option>entree</option>
          <option>appetizer</option>
          <option>dessert</option>
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

export default NewMenuItem;
