import React, { useState } from "react";
import "./ResetPassword.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "@material-ui/lab";
function ResetPassword() {
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const search = useLocation().search;
  const history = useHistory();
  console.log(new URLSearchParams(search).get("token"));
  const [ResetPassworddetials, setResetPassworddetials] = useState({
    Email: "",
    password: "",
    confirmPassword: "",
    Token: new URLSearchParams(search).get("token"),
  });
  const [Errors, SetErrors] = useState({
    Email: "",
    password: "",
    confirmPassword: "",
  });
  function AlertUsers(response) {
    setalert({
      open: true,
      message: response.data,
      type: response.status === 200 ? "success" : "error",
    });

    setTimeout(() => {
      setalert({ ...alertuser, open: false });
      history.push("/Login");
    }, 5000);
    console.log(response);
  }
  function validateData() {
    let isValid = true;
    var Feild = Errors;
    if (ResetPassworddetials.Email === "") {
      isValid = false;
      Feild["Email"] = "*Please enter Email";
      console.log("this is email empty");
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(ResetPassworddetials.Email)) {
        isValid = false;
        console.log("this is email not valid");
        Feild["Email"] = "*Please enter valid email-ID.";
      } else {
        Feild["Email"] = "";
      }
    }
    if (ResetPassworddetials.password === "") {
      isValid = false;
      Feild["password"] = "please enter the password";
    } else {
      pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!pattern.test(ResetPassworddetials.password)) {
        isValid = false;
        Feild["password"] = "please enter secure and strong password.";
      } else {
        Feild["password"] = "";
      }
    }
    /*conform password validation */
    if (ResetPassworddetials.confirmPassword === "") {
      isValid = false;
      Feild["confirmPassword"] = "please enter the conform password";
    } else {
      if (
        !(
          ResetPassworddetials.password === ResetPassworddetials.confirmPassword
        )
      ) {
        isValid = false;
        Feild["confirmPassword"] = "confirm password and password are not same";
      } else {
        Feild["confirmPassword"] = "";
      }
    }
    SetErrors({ ...Errors });

    console.log(Errors);
    return isValid;
  }
  function handleChange(e) {
    var feilds = ResetPassworddetials;
    var name = e.target.name;
    var value = e.target.value;
    feilds[name] = value;
    setResetPassworddetials({ ...ResetPassworddetials });
    console.log(ResetPassworddetials);
  }
  function SubmitResetPassword(e) {
    e.preventDefault();
    console.log(ResetPassworddetials);
    if (validateData()) {
      var config = {
        method: "post",
        url: "https://localhost:5001/api/Account/RestPassword",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(ResetPassworddetials),
      };
      axios(config)
        .then((response) => {
          AlertUsers(response);
          console.log(response);
        })
        .catch((err) => {
          AlertUsers(err.response);
        });
      console.log(ResetPassworddetials);
      setResetPassworddetials({
        Email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }
  return (
    <div className="ResetPasswordPage">
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
      <div className="ResetPasswordwindow">
        <div className="ResetPasswordheader">
          <span className="Title"> ResetPassword</span>
          <Link to="/">
            <button className="close ResetPassword_close">&times;</button>
          </Link>
        </div>
        <Form className="ResetPassword_form">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              name="Email"
              value={ResetPassworddetials.Email}
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
              value={ResetPassworddetials.password}
              onChange={handleChange}
            />
            <Form.Text className="error">{Errors.password}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleChange}
              value={ResetPassworddetials.confirmPassword}
            />
            <Form.Text className="error">{Errors.confirmPassword}</Form.Text>
          </Form.Group>
          <Form.Group></Form.Group>
          <div className="ResetPasswordSubmit">
            <Button
              variant="primary"
              type="submit"
              onClick={SubmitResetPassword}
            >
              ResetPassword
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
