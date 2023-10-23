import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { deleteMenuItem } from "../../../store/menuItems";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { useModal } from "../../../context/Modal";

const MenuItemsTab = ({ itemList }) => {
  const { restaurantId } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleDelete = (itemId) => {
    dispatch(deleteMenuItem(itemId));
    closeModal();
  };
  return (
    <>
      <h3>Manage your items</h3>
      <Link to={`/${restaurantId}/menuItems/new`}>
        <button>Create New Item</button>
      </Link>
      <div>
        {itemList.map((item) => (
          <div>
            {item.name}
            <Link to={`/${restaurantId}/menuItems/${item.id}/edit`}>
              <button>Edit</button>
            </Link>
            <OpenModalButton
              modalComponent={() => (
                <div>
                  <h3>Are you sure to delete this item from your menu? </h3>
                  <button
                    className="primary"
                    onClick={() => handleDelete(item.id)}
                  >
                    Yes
                  </button>
                  <button onClick={closeModal}>No</button>
                </div>
              )}
              buttonText={<div>Delete</div>}
            />
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default MenuItemsTab;
