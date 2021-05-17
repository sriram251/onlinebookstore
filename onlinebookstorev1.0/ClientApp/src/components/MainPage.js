import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar/TopNavbar";
import Login from "./login/Login";
import Register from "./Resgister/Register";
import Forgotpassword from "./Forgotpassword/Forgotpassword";
import ResetPassword from "./Resetpassword/ResetPassword";
import HomePage from "./HomePage/Homepage";
import Costumer from "./Users/costumer";
import Vendor from "./vendor/Vendorpage";
import Search from "./searchbooks/searchbooks";
import Checkoutpage from "./Checkoutpage/Checkoutpage";
import ViewBook from "./ViewBook/viewbook";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedRout } from "./protecedRout/protectedRoute";
import { setlogin, setuserdetails } from "../action";
import "./mainpage.css";
import Cookies from "js-cookie";
import axios from "axios";
function MainPage() {
  const dispatch = useDispatch();
  var islogged = useSelector((state) => state.islogged);
  var userdetail = useSelector((state) => state.userDetails);
  function GetuserData() {
    var config = {
      method: "get",
      url: "https://localhost:5001/api/Account/Getuser/" + Cookies.get("Email"),
    };
    axios(config)
      .then((Response) => {
        dispatch(setuserdetails(Response.data));
        dispatch(setlogin());
      })
      .catch((err) => {
        console.log(err.Response);
      });
  }
  if (userdetail.id === undefined && Cookies.get("islogged")) {
    console.log("islogged and get data");
    GetuserData();
  }
  useEffect(() => {
    console.log("this is from the mainpage");

    if (Cookies.get("islogged") && Cookies.get("islogged") !== undefined) {
      GetuserData();
    }
  }, []);
  const Userpage = () => {
    if (userdetail.role === "vendor") {
      return (
        <ProtectedRout path="/user" isAuth={islogged} Component={Vendor} />
      );
    } else {
      return (
        <ProtectedRout path="/user" isAuth={islogged} Component={Costumer} />
      );
    }
  };
  return (
    <div className="store">
      <TopNavbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/Search" exact>
          <Search />
        </Route>
        <ProtectedRout
          path="/Checkout/:isbn"
          isAuth={islogged}
          Component={Checkoutpage}
          exact
        />
        <Route path="/Book/:isbn" exact>
          <ViewBook />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/Forgotpassword" exact>
          <Forgotpassword />
        </Route>
        <Route exact path="/RestPassword">
          <ResetPassword />
        </Route>
        <Userpage />
      </Switch>
    </div>
  );
}

export default MainPage;
