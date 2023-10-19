import React, { createContext, useContext, useState } from "react";
import "./Sidebar.css"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


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
  const { isSidebarVisible, setIsSidebarVisible } = useSidebarContext()
  const user = useSelector(state => state.session.user)

  // dispatch for session user, if logged in then show following
  // also show recommended for user, if user isn't logged in show generic recommended

  return (
    <>
      <div id='sidebar-background' className={isSidebarVisible ? '' : 'hidden'} onClick={() => setIsSidebarVisible(false)}>&nbsp;</div>
      <div className={`sidebar ${isSidebarVisible ? 'open' : ''}`}>
        <div className="sidebar-buttons">
          {user ? <>
          </> : <>
            <NavLink to="/signup" className="sidebar-button-signup">
              Sign up
            </NavLink>
            <NavLink to="/login" className="sidebar-button-login">
              Log in
            </NavLink>
          </>}
        </div>
      </div>
    </>
  )
}
