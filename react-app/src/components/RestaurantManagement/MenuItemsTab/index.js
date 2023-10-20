import React from "react";

import { Link, useParams } from "react-router-dom";
import { deleteMenuItem } from "../../../store/menuItems";
import { useDispatch } from "react-redux";

const MenuItemsTab = ({ itemList }) => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (itemId) => {
    dispatch(deleteMenuItem(itemId));
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
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default MenuItemsTab;
