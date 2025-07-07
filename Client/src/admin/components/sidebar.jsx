import React, { useState } from "react";
import './CSS/Sidebar.css';
import { NavLink } from "react-router-dom";

const Sidebar = () => {



  return (
    <div className="sidebar">
      <h3 style={{ marginBottom: "30px" }}>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: "2.2" }}>
       <li><NavLink to={'/dashboard'} className={'nav'}>Dashboard</NavLink></li>
       <li><NavLink to={'/admin/user'} className={'nav'}>Users</NavLink></li>
       <li><NavLink to={'/Insert'} className={'nav'}>Insert Product</NavLink></li>
       <li><NavLink to={'/Manage'} className={'nav'}>Manage Product</NavLink></li>
       <li><NavLink to={'/'} className={'nav'}>Pending Orders</NavLink></li>


      </ul>
    </div>
  );
};



export default Sidebar;
