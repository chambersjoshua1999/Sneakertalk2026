import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../LoginAssets/kix.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src= {Logo} alt="" />
          </Link>

        </div>
        <div className="links">
      
          <span>Welcome {currentUser?.username}!</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Share
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
