import React, { createContext, useContext, useState } from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
import recommended from '../seedData/repps.json'


const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false)

  const value = {
    isSidebarVisible,
    setIsSidebarVisible,
    isNavbarVisible,
    setIsNavbarVisible,
    toggleNavbar,
    setToggleNavbar,
    mobileSearch,
    setMobileSearch
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
    const { isSidebarVisible } = useSidebarContext()
    // dispatch for session user, if logged in then show following
    // also show recommended for user, if user isn't logged in show generic recommended

    return (
        <div className={`sidebar ${isSidebarVisible ? 'open' : ''}`}>
            <ul className="sidebar-pages">
                <li>
                    <NavLink to="/" className="sidebar-el link home-button">
                        <i className="fa-solid fa-house sidebar-el-icon"></i>
                        <span className="sidebar-el-name">Home</span>
                    </NavLink>
                </li>
                {/* <li className="sidebar-el link trending">
                    <i className="fa-solid fa-fire sidebar-el-icon"></i>
                    <span className="sidebar-el-name">Trending</span>
                </li> */}
                <li>
                    <NavLink to="/categories" className="sidebar-el link genre-button">
                        <i className="fa-solid fa-icons sidebar-el-icon"></i>
                        <span className="sidebar-el-name">Genres</span>
                    </NavLink>
                </li>
            </ul>
            {/* <ul className="sidebar-following">
                <li className="sidebar-el">Following</li>
            </ul> */}
            <ul className="sidebar-recommended">
                <li className="sidebar-el title">Recommended</li>
                {recommended.map(repp => (
                    <li key={repp.id}>
                        <NavLink to={repp.linkName} className="sidebar-el link profile">
                            <img src={repp.profileImage} className="sidebar-profile"/>
                            <span className="sidebar-el-name">{repp.displayName}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
