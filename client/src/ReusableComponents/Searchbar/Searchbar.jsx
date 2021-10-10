import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./styles.module.scss";

const Searchbar = ({ placeholder, onChange }) => {
  return (
    <div className={classes.searchbar}>
      <input
        className={classes.searchbar_input}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon />
    </div>
  );
};

export default Searchbar;
