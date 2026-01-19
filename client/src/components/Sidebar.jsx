// src/components/Sidebar.js
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

// MUI icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Sidebar = () => {
  const location = useLocation();

  // Absolute paths
  const links = [
    { label: "Add Items", to: "/admin/add-items", icon: <AddBoxIcon /> },
    { label: "All Products", to: "/admin/all-products", icon: <Inventory2Icon /> },
    { label: "Orders", to: "/admin/orders", icon: <AssignmentIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "white",
        color: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold", color: "black" }}
      >
        Admin Panel
      </Typography>

      <List>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <ListItemButton
              key={link.to}
              component={Link}
              to={link.to}
              sx={{
                backgroundColor: active ? "grey.300" : "transparent",
                borderRadius: 1,
                mb: 1,
                color: "black",
                "&:hover": {
                  backgroundColor: "grey.300",
                  color: "black",
                },
              }}
            >
              <ListItemIcon sx={{ color: "black", minWidth: 36 }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
