import React, { useState, useEffect } from "react";

import Button from "../../ReusableComponents/Button/Button";
import UserInitial from "../../ReusableComponents/UserInitial/UserInitial";
import Submenu from "./Submenu/Submenu";
import AccountModal from "../AccountModal/AccountModal";

import { NavLink, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../Assets/logo.png";
import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/UserInitial/styles.module.scss";

const Navbar = ({ currentUser, setCurrentUser, getCurrentUser }) => {
  const [submenuActive, setSubmenuActive] = useState(false);
  const [accountModalActive, setAccountModalActive] = useState(false);

  const history = useHistory();

  useEffect(() => {}, [currentUser]);

  const toggleSubmenu = () => {
    setSubmenuActive(!submenuActive);
  };

  const toggleAccountModal = () => {
    setAccountModalActive(!accountModalActive);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const redirectToUserPage = () => {
    history.push("/user-page");
  };

  return (
    <header className={classes.navbar}>
      <NavLink to="/">
        <img
          src={logo}
          className={classes.navbar_logo}
          alt="ოქროს ბირჟა საქართველოში"
        />
      </NavLink>
      <div className={classes.navbar_userInitial}>
        {currentUser && (
          <UserInitial
            classes={`${userClasses.initial} ${userClasses.initial_nav} `}
            initial={currentUser.email.toUpperCase().charAt(0)}
          />
        )}
      </div>
      <div className={classes.navbar_actions}>
        <Button
          label={currentUser ? "ჩემი გვერდი" : "შესვლა"}
          onClick={currentUser ? redirectToUserPage : toggleAccountModal}
        />
        <MenuIcon
          fontSize={"medium"}
          style={{ color: "#ffffff", cursor: "pointer" }}
          onClick={toggleSubmenu}
        />
      </div>
      {submenuActive && (
        <div onMouseLeave={toggleSubmenu} className={classes.submenu}>
          <Submenu currentUser={currentUser} handleLogout={handleLogout} />
        </div>
      )}
      {accountModalActive && (
        <AccountModal
          toggleAccountModal={toggleAccountModal}
          getCurrentUser={getCurrentUser}
          accountModalActive={accountModalActive}
        />
      )}
    </header>
  );
};

export default Navbar;
