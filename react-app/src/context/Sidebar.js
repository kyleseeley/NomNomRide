import React, { createContext, useContext, useState } from "react";
import "./Sidebar.css"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../store/session";


const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const value = {
    isSidebarVisible,
    setIsSidebarVisible
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export function Sidebar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isSidebarVisible, setIsSidebarVisible } = useSidebarContext()
  const user = useSelector(state => state.session.user)

  const handleLogout = () => {
    console.log("huh?")
    dispatch(logout())
    setIsSidebarVisible(false)
    history.push('/')
  }

  // dispatch for session user, if logged in then show following
  // also show recommended for user, if user isn't logged in show generic recommended

  return (
    <>
      <div id='sidebar-background' className={isSidebarVisible ? '' : 'hidden'} onClick={() => setIsSidebarVisible(false)}>&nbsp;</div>
      <div className={`account-sidebar ${isSidebarVisible ? 'open' : ''}`}>
        <div className="sidebar-main">
          {user ? <>
            <div className="sidebar-profile-div">
              {/* user circle standin for image */}
              <i className="fas fa-user-circle" id='sidebar-profile-img' />
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user.firstname}</div>
                <NavLink to='/account' className='sidebar-account-link'>Manage account</NavLink>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="sidebar-signout">
              Sign out
            </button>
          </> : <>
            <NavLink
              to="/signup"
              onClick={() => setIsSidebarVisible(false)}
              className="sidebar-button-signup">
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsSidebarVisible(false)}
              className="sidebar-button-login">
              Log in
            </NavLink>
          </>}
        </div>
        <div className="sidebar-links">
          <NavLink
            to='/new'
            onClick={() => setIsSidebarVisible(false)}
            className='add-restaurant-link'>
            Add your restaurant
          </NavLink>
        </div>
      </div>
    </>
  )
}
