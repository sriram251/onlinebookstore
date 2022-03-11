import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Forgotpassword.css";
import { Alert } from "@material-ui/lab";
import axios from "axios";
function Forgotpassword() {
  const [Email, SetEmail] = useState("");
  const [Error, setError] = useState("");
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  function handleChange(e) {
    SetEmail(e.target.value);
    console.log(Email);
  }
  function validateData() {
    var isValid = true;
    if (Email === "") {
      isValid = false;
      setError("*please enter Email");
    } else {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(Email)) {
        isValid = false;
        setError("*Please enter valid email-ID.");
      } else {
        setError("");
      }
    }
    return isValid;
  }
  function AlertUsers(response) {
    console.log(response);
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
  function submitForm(e) {
    e.preventDefault();
    if (validateData()) {
      console.log({ email: Email });
      var config = {
        method: "post",
        url: "https://localhost:5001/api/Account/Forgotpassword",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ Email: Email }),
      };
      axios(config)
        .then((response) => {
          AlertUsers(response);
          console.log(response);
        })
        .catch((err) => {
          AlertUsers(err.response);
        });
      SetEmail("");
    }
  }
  return (
    <div className="forgotpassword">
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
      <div className="forgotpasswordWindow">
        <div className="forgotpasswordheader">
          <span className="Title">Forgotpassword</span>
          <Link to="/">
            <button className="close forgotpassword_close">&times;</button>
          </Link>
        </div>
        <Form className="forgotpassword_form">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={handleChange}
            />
            <Form.Text className="error">{Error}</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Rest
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Forgotpassword;
