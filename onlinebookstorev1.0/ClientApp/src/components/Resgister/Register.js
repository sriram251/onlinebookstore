import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "@material-ui/lab";
function Register() {
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [RegisetDetails, SetRegisterDetails] = useState({
    Email: "",
    FirstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "Costumer",
  });
  const [Errors, setErrors] = useState({
    Email: "",
    FirstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  function validateData() {
    let isvalid = true;
    var feilds = Errors;

    /*Email validation */
    if (RegisetDetails.Email === "") {
      feilds["Email"] = "please enter email";

      isvalid = false;
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(RegisetDetails.Email)) {
        isvalid = false;
        feilds["Email"] = "*Please enter valid email-ID.";
      } else {
        feilds["Email"] = "";
      }
    }

    /*password validation */
    if (RegisetDetails.password === "") {
      isvalid = false;
      feilds["password"] = "please enter the password";
    } else {
      pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!pattern.test(RegisetDetails.password)) {
        isvalid = false;
        feilds["password"] = "please enter secure and strong password.";
      } else {
        feilds["password"] = "";
      }
    }
    /*conform password validation */
    if (RegisetDetails.confirmPassword === "") {
      isvalid = false;
      feilds["confirmPassword"] = "please enter the conform password";
    } else {
      if (!(RegisetDetails.password === RegisetDetails.confirmPassword)) {
        isvalid = false;
        feilds["confirmPassword"] =
          "confirm password and password are not same";
      } else {
        feilds["confirmPassword"] = "";
      }
    }

    // FirstNameValidator
    if (RegisetDetails.FirstName === "") {
      isvalid = false;
      feilds["FirstName"] = "please enter FirstName";
    } else {
      var nameRegex = new RegExp(/^[a-zA-Z]+$/);
      if (!nameRegex.test(RegisetDetails.FirstName)) {
        isvalid = false;
        feilds["FirstName"] = "*Please enter valid FirstName.";
      } else {
        feilds["FirstName"] = "";
      }
    }
    if (RegisetDetails.lastName === "") {
      isvalid = false;
      feilds["lastName"] = "please enter LastName";
    } else {
      if (!nameRegex.test(RegisetDetails.lastName)) {
        isvalid = false;
        feilds["lastName"] = "*Please enter valid FirstName.";
      } else {
        feilds["lastName"] = "";
      }
    }

    setErrors({ ...Errors });

    return isvalid;
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
  function submitRegisterForm(e) {
    console.log("submit");
    e.preventDefault();
    if (validateData()) {
      console.log(RegisetDetails);
      var config = {
        method: "post",
        url: "https://localhost:5001/api/Account/Register",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(RegisetDetails),
      };
      axios(config)
        .then((response) => {
          AlertUsers(response);
          console.log(response);
        })
        .catch((err) => {
          AlertUsers(err.response);
        });
      SetRegisterDetails({
        Email: "",
        FirstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        role: "Costumer",
      });
    }
  }
  function handleChange(e) {
    var feild = RegisetDetails;
    feild[e.target.name] = e.target.value;
    SetRegisterDetails({ ...RegisetDetails });
  }
  return (
    <div className="RegisterPage">
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
      <div className="Registerwindow">
        <div className="Registerheader">
          <span className="Title"> Register</span>
          <Link to="/">
            <button className="close Register_close">&times;</button>
          </Link>
        </div>
        <Form className="Register_form">
          <Form.Group>
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="FirstName"
              name="FirstName"
              value={RegisetDetails.FirstName}
              onChange={handleChange}
            />
            <Form.Text className="error">{Errors.FirstName}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Group>
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="LastName"
                name="lastName"
                value={RegisetDetails.lastName}
                onChange={handleChange}
              />
              <Form.Text className="error">{Errors.lastName}</Form.Text>
            </Form.Group>
            <Form.Group></Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              name="Email"
              value={RegisetDetails.Email}
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
              value={RegisetDetails.password}
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
              value={RegisetDetails.confirmPassword}
            />
            <Form.Text className="error">{Errors.confirmPassword}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" name="role" onChange={handleChange}>
              <option value="Costumer">Costumer</option>
              <option value="vendor">vendor</option>
            </Form.Control>
          </Form.Group>
          <div className="RegisterSubmit">
            <Button
              variant="primary"
              type="submit"
              onClick={submitRegisterForm}
            >
              Register
            </Button>

            <Link to="/Login" className="Login">
              Login?
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

export default Register;
