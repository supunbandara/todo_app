import React from "react";
import NavStyles from "./navbar.module.scss";

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    // redirect to login screen
  };

  return (
    <div className={NavStyles.header}>
      <div className={NavStyles.header_item}>ToDo</div>
      <div className={NavStyles.header_item} onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};

export default Navbar;
