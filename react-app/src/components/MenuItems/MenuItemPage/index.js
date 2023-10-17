import React from "react";
import { Link }from "react-router-dom"
const sampleData = {};

function MenuItemPage() {
  // const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
      <h1>Menu Items</h1>
      <button><Link to="/menuItems/new">New</Link></button>
    </div>
  );
}

export default MenuItemPage;
