import React from "react";

import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";

import classes from "./styles.module.scss";

const Button = ({ label, onClick }) => {
  return (
    <button className={classes.button} onClick={(e) => onClick(e)}>
      <PersonOutlineSharpIcon />
      {label}
    </button>
  );
};

export default Button;
