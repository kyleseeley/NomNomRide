import React, {useState} from "react";

import { Link, useParams } from "react-router-dom";
import { deleteMenuItem } from "../../../store/menuItems";
import { useDispatch } from "react-redux";
import Modal from "../../Modal";
const MenuItemsTab = ({ itemList }) => {
  const { restaurantId } = useParams();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (itemId) => {
    dispatch(deleteMenuItem(itemId));
    setConfirmModalOpen(false);
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
            <button onClick={() => setConfirmModalOpen(true)}>Delete</button>
            {confirmModalOpen && (
              <Modal title="Confirm Delete">
                <div>
                  <h3>Are you sure to delete this item from your menu? </h3>
                  <button className="primary" onClick={handleDelete(item.id)}>
                    Yes
                  </button>
                  <button onClick={() => setConfirmModalOpen(false)}>No</button>
                </div>
              </Modal>
            )}
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default MenuItemsTab;
