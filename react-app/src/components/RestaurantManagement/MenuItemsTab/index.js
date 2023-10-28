import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { deleteMenuItem } from "../../../store/menuItems";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { useModal } from "../../../context/Modal";
import "./menuItemsTab.css";
const MenuItemsTab = ({ itemList }) => {
  const { restaurantId } = useParams();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleDelete = (itemId) => {
    dispatch(deleteMenuItem(itemId));
    closeModal();
  };
  return (
    <div>
      <h3>Manage your items</h3>
      <div className="manage-item-container">
        <div>
          <Link to={`/${restaurantId}/menuItems/new`}>
            <button className="cart-button">
              <i class="fa-solid fa-plus"></i> Create New Item
            </button>
          </Link>
        </div>
        <div>
          <table>
            <tr>
              <th>Item Name</th>
              <th>Actions</th>
            </tr>
            {itemList.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>
                  <Link to={`/${restaurantId}/menuItems/${item.id}/edit`}>
                    <button>
                      <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                  </Link>
                  <OpenModalButton
                    modalComponent={() => (
                      <div>
                        <h3>
                          Are you sure to delete {item.name} from your menu?{" "}
                        </h3>
                        <button
                          className="primary"
                          onClick={() => handleDelete(item.id)}
                        >
                          Yes
                        </button>
                        <button onClick={closeModal}>No</button>
                      </div>
                    )}
                    buttonText={
                      <div>
                        <i class="fa-solid fa-trash" /> Delete
                      </div>
                    }
                  />
                </td>
              </tr>
            ))}{" "}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuItemsTab;
