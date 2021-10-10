import React from "react";
import { useHistory } from "react-router-dom";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WebIcon from "@mui/icons-material/Web";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import classes from "./styles.module.scss";

const Submenu = ({ currentUser, handleLogout }) => {
  const history = useHistory();
  return (
    <Paper className={classes.submenu}>
      <MenuList>
        <MenuItem
          onClick={() => {
            history.push("/user-page");
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon
              fontSize={"small"}
              style={{ color: "#657274" }}
            />
          </ListItemIcon>
          <ListItemText>ჩემი გვერდი</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/contact-us");
          }}
        >
          <ListItemIcon>
            <RoomServiceIcon fontSize={"small"} style={{ color: "#657274" }} />
          </ListItemIcon>
          <ListItemText>კონტაქტი</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/terms-and-conditions");
          }}
        >
          <ListItemIcon>
            <ErrorOutlineIcon fontSize="small" style={{ color: "#657274" }} />
          </ListItemIcon>
          <ListItemText>სამომხმარებლო წესები და პირობები</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/ad");
          }}
        >
          <ListItemIcon>
            <WebIcon fontSize="small" style={{ color: "#657274" }} />
          </ListItemIcon>
          <ListItemText>რეკლამის განთავსება</ListItemText>
        </MenuItem>
        {currentUser && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon
                fontSize="small"
                style={{ color: "#657274", cursor: "pointer" }}
              />
            </ListItemIcon>
            <ListItemText>გასვლა</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Paper>
  );
};

export default Submenu;
