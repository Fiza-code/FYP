// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Box, Button, IconButton, Typography,
  Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme,
  Menu, MenuItem, Badge, Avatar
} from "@mui/material";
import {
  Menu as MenuIcon, Search as SearchIcon,
  LocalMallOutlined as CartIcon, SupportAgentOutlined as SupportIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer, closeDrawer, toggleSearch, openMenu, closeMenu } from "../Store/navbarSlice";
import { logout } from "../Store/authSlice";
import { fetchCart } from "../Store/cartSlice"; 
import AuthCard from "./AuthCard";
import SearchBar from "./SearchBar";
import { API_URL } from "../config";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { drawerOpen, showSearch, anchorEl } = useSelector((s) => s.navbar);
  const { isLoggedIn, user } = useSelector((s) => s.auth);
  const cartProducts = useSelector((s) => s.cart.products || []);

  const [authOpen, setAuthOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [products, setProducts] = useState([]);

  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "COLLECTION", path: "/collection" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" }
  ];

  // Fetch Cart
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Fetch Search Products
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "rgba(255,255,255,0.95)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>

          {/* Logo */}
          <Link to="/">
            <Box component="img" src="/logofyp.png" alt="Logo" sx={{ height: 60 }} />
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navLinks.map((l) => (
                <Typography
                  key={l.path}
                  component={Link}
                  to={l.path}
                  sx={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textDecoration: "none",
                    paddingBottom: "4px",
                    borderBottom: location.pathname === l.path ? "2px solid grey" : "none",
                    color: location.pathname === l.path ? "grey" : "black",
                  }}
                >
                  {l.label}
                </Typography>
              ))}

              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none", ml: 2, color: "black", borderColor: "black" }}
                onClick={() => isLoggedIn ? window.open("/admin", "_blank") : setAuthOpen(true)}
              >
                Admin Panel
              </Button>
            </Box>
          )}

          {/* Right Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={() => dispatch(toggleSearch())} sx={{ color: "black" }}>
              <SearchIcon />
            </IconButton>

            {/* Profile / Support Icon */}
            <IconButton onClick={(e) => dispatch(openMenu(e.currentTarget))} sx={{ color: "black" }}>
              {isLoggedIn && user?.image ? (
                <Avatar
                  src={`${API_URL}${user.image}`}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <SupportIcon />
              )}
            </IconButton>

            {/* Dropdown Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => dispatch(closeMenu())}>
              {!isLoggedIn ? (
                <MenuItem onClick={() => { setAuthOpen(true); dispatch(closeMenu()); }}>Login</MenuItem>
              ) : (
                <>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={() => dispatch(closeMenu())}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      dispatch(closeMenu());
                      navigate("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>

            {/* Cart */}
            <IconButton component={Link} to="/cart" sx={{ color: "black" }}>
              <Badge badgeContent={cartProducts.length} color="secondary" showZero max={9999}>
                <CartIcon />
              </Badge>
            </IconButton>

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton onClick={() => dispatch(toggleDrawer())} sx={{ color: "black" }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Space for fixed navbar */}
      <Toolbar />

      {/* Search Bar */}
      <SearchBar showSearch={showSearch} products={products} onCloseSearch={() => dispatch(toggleSearch())} />

      {/* Drawer (Mobile Menu) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => dispatch(closeDrawer())}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => dispatch(closeDrawer())}><CloseIcon /></IconButton>
          </Box>
          <List>
            {navLinks.map((l) => (
              <ListItem button key={l.path} component={Link} to={l.path} onClick={() => dispatch(closeDrawer())}>
                <ListItemText primary={l.label} />
              </ListItem>
            ))}

            <ListItem
              button
              component={Link}
              to="/profile"
              onClick={() => dispatch(closeDrawer())}
            >
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem
              button
            onClick={() => {
  if (isLoggedIn) {
    navigate("/admin");
  } else {
    setAuthOpen(true);
  }
  dispatch(closeDrawer());
}}

            >
              <ListItemText primary="Admin Panel" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Login / Signup Modal */}
      <AuthCard open={authOpen} onClose={() => setAuthOpen(false)} isSignup={isSignup} setIsSignup={setIsSignup} />
    </>
  );
};

export default Navbar;
