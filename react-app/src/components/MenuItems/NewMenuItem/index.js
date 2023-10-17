import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMenuItem } from "../../../store/menuItems";

const NewMenuItem = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("entree");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async() =>{
    await dispatch(createMenuItem(name, type, price, description, image))
  };
  return (
    <div>
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
