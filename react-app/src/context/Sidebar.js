import React, { createContext, useContext, useState } from "react";
import "./Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../store/session";
import RestaurantList from "../components/RestaurantManagement/RestaurantList";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const value = {
    isSidebarVisible,
    setIsSidebarVisible,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSidebarVisible, setIsSidebarVisible } = useSidebarContext();
  const user = useSelector((state) => state.session.user);
  // const ownedRestaurants = useSelector(state => state.session.restaurants)

  const handleLogout = () => {
    dispatch(logout());
    setIsSidebarVisible(false);
    history.push("/");
  };

  return (
    <>
      <div
        id="sidebar-background"
        className={isSidebarVisible ? "" : "hidden"}
        onClick={() => setIsSidebarVisible(false)}
      >
        &nbsp;
      </div>
      <div className={`account-sidebar ${isSidebarVisible ? "open" : ""}`}>
        <div className={`sidebar-main ${user ? "" : "nouser"}`}>
          {user ? (
            <>
              <div className="sidebar-profile-div">
                <i className="fas fa-user-circle" id="sidebar-profile-img" />
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">{user.firstname}</div>
                  <NavLink
                    onClick={() => setIsSidebarVisible(false)}
                    to="/account"
                    className="sidebar-account-link"
                  >
                    Manage account
                  </NavLink>
                </div>
              </div>

              <button onClick={handleLogout} className="sidebar-signout">
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={() => setIsSidebarVisible(false)}
                className="sidebar-button-signup"
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsSidebarVisible(false)}
                className="sidebar-button-login"
              >
                Log in
              </NavLink>
            </>
          )}
        </div>
        <div className="sidebar-extra-links">
          <div>
            <RestaurantList />
          </div>
          {user && (
            <div className="sidebar-button-add">
              <NavLink
                to="/new"
                onClick={() => setIsSidebarVisible(false)}
                className="cart-button "
              >
                <i class="fa-solid fa-plus"></i> Add New
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
