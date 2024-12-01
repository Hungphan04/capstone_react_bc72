import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { logout } from "../../store/slices/user.slice";
import { PropTypes } from "prop-types";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handleLogin = () => {
    navigate(PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(PATH.REGISTER);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="p-4 flex justify-between top-0 left-0 w-full z-[9999]  bg-white">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
        <nav className="hidden md:flex items-center space-x-5 text-black">
          <a href="/" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            Booking
          </a>
          <a href="#" className="hover:text-red-700">
            News
          </a>
        </nav>
      </div>
      <div>
        {!currentUser ? (
          <>
            <button
              className="bg-red-700 text-white px-3 py-1 rounded-lg mx-2"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <button
              className="bg-red-700 text-white px-3 py-1 rounded-lg"
              onClick={handleRegister}
            >
              Đăng kí
            </button>
          </>
        ) : (
          <>
            <Avatar onClick={handleMenu} sx={{ cursor: "pointer" }}>
              {currentUser.hoTen.charAt(0)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
