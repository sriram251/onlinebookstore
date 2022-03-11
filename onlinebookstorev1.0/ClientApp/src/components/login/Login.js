import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { setuserdetails, setlogin } from "../../action";
import Cookies from "js-cookie";
function Login() {
  var history = useHistory();
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [Loigndetails, setlogindetials] = useState({ Email: "", password: "" });
  const [Errors, SetErrors] = useState({ Email: "", password: "" });
  function validateData() {
    let isValid = true;
    var Feild = Errors;
    if (Loigndetails.Email === "") {
      isValid = false;
      Feild["Email"] = "*Please enter Email";
      console.log("this is email empty");
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(Loigndetails.Email)) {
        isValid = false;
        console.log("this is email not valid");
        Feild["Email"] = "*Please enter valid email-ID.";
      } else {
        Feild["Email"] = "";
      }
    }
    if (Loigndetails.password === "") {
      isValid = false;
      Feild["password"] = "*Please enter password";
      //SetErrors({ ...Errors, password: "*Please enter password" });
    } else {
      Feild["password"] = "";
      //SetErrors({ ...Errors, password: "" });
    }
    SetErrors({ ...Errors });

    console.log(Errors);
    return isValid;
  }
  function AlertUsers(response) {
    setalert({
      open: true,
      message: response.data,
      type: response.status === 200 ? "success" : "error",
    });

    setTimeout(() => {
      setalert({ ...alertuser, open: false });
    }, 5000);
    console.log(response);
  }
  function handleChange(e) {
    var feilds = Loigndetails;
    var name = e.target.name;
    var value = e.target.value;
    feilds[name] = value;
    setlogindetials({ ...Loigndetails });
  }
  function SubmitLogin(e) {
    e.preventDefault();
    if (validateData()) {
      console.log(Loigndetails);
      var config = {
        method: "post",
        url: "https://localhost:5001/api/Account/Login",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
        },
        data: JSON.stringify(Loigndetails),
      };
      axios(config)
        .then((response) => {
          dispatch(setuserdetails(response.data));
          dispatch(setlogin());
          Cookies.set("islogged", true, { expires: 1 / 24 });
          Cookies.set("Email", response.data.email, { expires: 1 / 24 });
          console.log(document.cookie);
          history.push("/");
          console.log(history);
          console.log(alertuser);
        })
        .catch((err) => {
          console.log(err);
          AlertUsers(err.response);
          console.log(alertuser);
        });

      setlogindetials({ Email: "", password: "" });
    }
  }
  return (
    <div className="loginPage">
      <Alert
        variant="filled"
        severity={alertuser.type}
        hidden={!alertuser.open}
        className="alertuser"
        action={
          <p
            style={{ cursor: "pointer", margin: "2px 0px" }}
            onClick={() => {
              setalert({ ...alertuser, open: false });
            }}
          >
            &times;
          </p>
        }
      >
        {alertuser.message}
      </Alert>
      <div className="loginwindow">
        <div className="loginheader">
          <span className="Title"> login</span>
          <Link to="/">
            <button className="close login_close">&times;</button>
          </Link>
        </div>
        <Form className="login_form">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              name="Email"
              value={Loigndetails.Email}
              onChange={handleChange}
            />
            <Form.Text className="error">{Errors.Email}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              value={Loigndetails.password}
              onChange={handleChange}
            />
            <Form.Text className="error">{Errors.password}</Form.Text>
          </Form.Group>
          <div className="loginSubmit">
            <Button variant="primary" type="submit" onClick={SubmitLogin}>
              login
            </Button>

            <Link to="/Register" className="register">
              Register?
            </Link>
          </div>
          <Link to="/Forgotpassword" className="register forgotPass">
            forgot password?
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
