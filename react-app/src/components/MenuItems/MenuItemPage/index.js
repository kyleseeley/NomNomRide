import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MenuItem.css";
import { fetchMenuItems } from "../../../store/menuItems";
const sampleData = {};

function MenuItemPage() {
  // const sessionUser = useSelector(state => state.session.user);
  const { restaurantId } = useParams();
  const { items } = useSelector((storeState) => ({
    items: storeState.menuItems.items,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems(restaurantId));
  }, [restaurantId]);

  return (
    <div>
      <h1>Menu Items</h1>
      {JSON.stringify(items)}
      <button>
        <Link to={`/restaurants/${restaurantId}/menuItems/new`}>New</Link>
      </button>
    </div>
  );
}

export default MenuItemPage;
