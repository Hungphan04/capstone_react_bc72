import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ href, icon, title }) {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <ListItem
        sx={{ cursor: "pointer" }}
        button = "true"
        onClick={() => {
          handleNavigate(href);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </div>
  );
}
