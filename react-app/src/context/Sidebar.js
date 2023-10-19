import React, { createContext, useContext, useState } from "react";
import "./Sidebar.css"
import ReactDOM from 'react-dom'
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
    // dispatch for session user, if logged in then show following
    // also show recommended for user, if user isn't logged in show generic recommended

    return (
      <>
        <div id='sidebar-background' className={isSidebarVisible ? '' : 'hidden'} onClick={() => setIsSidebarVisible(false)}>&nbsp;</div>
        <div className={`sidebar ${isSidebarVisible ? 'open' : ''}`}>
          <div id="sidebar-content">
            <ul className="sidebar-pages">
                <li>
                    <NavLink to="/" className="sidebar-el link home-button">
                        <i className="fa-solid fa-house sidebar-el-icon"></i>
                        <span className="sidebar-el-name">Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories" className="sidebar-el link genre-button">
                        <i className="fa-solid fa-icons sidebar-el-icon"></i>
                        <span className="sidebar-el-name">Genres</span>
                    </NavLink>
                </li>
            </ul>
          </div>
        </div>
      </>
    )
}
