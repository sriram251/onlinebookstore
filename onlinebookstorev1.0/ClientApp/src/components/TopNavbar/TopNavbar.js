import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../action";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import "./topNav.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import logo from "../../images/logo.PNG";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cookies from "js-cookie";
import axios from "axios";
function TopNavbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showlogout, setshowlogout] = useState(false);
  const [showMenu, setshowMenu] = useState("hide");
  const [windowWidth, setwidth] = useState(window.innerWidth);
  const islogged = useSelector((state) => state.islogged);
  const userdetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });
  }, []);
  return (
    <div className="TopNavebar">
      {windowWidth < 633 ? (
        <MenuIcon
          className="menubutton"
          type="button"
          onClick={() => {
            setshowMenu("");
          }}
        />
      ) : (
        <></>
      )}
      <img src={logo} alt="Logo" className="logoimage" />
      <div className="navmenu">
        <div className={`${windowWidth < 633 ? "hidemenu" : ""} ${showMenu}`}>
          <div className="closemenu">
            {windowWidth < 633 ? (
              <CloseIcon
                onClick={() => {
                  setshowMenu("hide");
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <Link to="/" className="Navitems">
            Home
          </Link>
          <Link to="/search" className="Navitems">
            FindBooks
          </Link>
          <Link to="/user" className="Navitems">
            User
          </Link>
        </div>
      </div>
      <div className="userdetailscontainer">
        {!islogged ? (
          <Button
            className="loginbutton"
            onClick={() => {
              history.push("/Login");
            }}
          >
            login
          </Button>
        ) : (
          <span>
            <Link to="/user/Cart">
              <IconButton aria-label="cart">
                <Badge
                  badgeContent={userdetails.usercart.length}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {userdetails.firstName + userdetails.lastName} <AccountCircleIcon />
            <ArrowDropDownIcon
              className="showlogout"
              onClick={() => {
                setshowlogout(!showlogout);
              }}
            />
          </span>
        )}
      </div>
      <div
        className={`logoutbutton ${showlogout ? "openlogout" : ""}`}
        onClick={() => {
          var config = {
            method: "post",
            url: "https://localhost:5001/api/Account/Logout",
          };
          axios(config).then((response) => {
            Cookies.remove("islogged");
            Cookies.remove("Email");
            dispatch(Logout());
            setshowlogout(!showlogout);
          });
        }}
      >
        <span>
          Logout <ExitToAppIcon />
        </span>
      </div>
    </div>
  );
}

export default TopNavbar;
