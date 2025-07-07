import React from "react";
import Img from '../assets/logo.png';

const AdminHeader = () => {
  const headerHeight = 70;
  return (
    <>
    <div
        style={{
          background: "#fff",
          color: "black",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          height: `${headerHeight}px`, // fixed height
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
       <img src={Img} alt={'logo'} height={'50px'}/>|
        Admin Panel
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span>Welcome, Admin</span>
        <button style={{ padding: "5px 10px", background: "#f44336", border: "none", borderRadius: "4px", color: "#fff", cursor: "pointer" }}>
          Logout
        </button>
      </div>
    </div>
    <div style={{ height: `${headerHeight}px` }}></div>
    </>
  );
};

export default AdminHeader;
