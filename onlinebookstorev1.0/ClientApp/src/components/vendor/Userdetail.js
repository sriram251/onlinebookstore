import React, { useState } from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setuserdetails } from "../../action";
import { Alert } from "@material-ui/lab";
import axios from "axios";
function Userdetail() {
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.userDetails);
  //   userdelatils changes
  const [userdetail, setuserdetail] = useState({
    Email: userdetails.email,
    shopName: userdetails.shopName,
    lastName: userdetails.lastName,
    firstName: userdetails.firstName,
    phonenumber: userdetails.phonenumber,
  });
  const [userdetailerror, setuserdetailerror] = useState({
    Email: "",
    shopName: "",
    phonenumber: "",
    lastName: "",
    firstName: "",
  });
  const [userdetailsupdate, setuserdetailupdate] = useState(false);
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });
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
  function GetuserData() {
    var config = {
      method: "get",
      url: "https://localhost:5001/api/Account/Getuser/" + userdetails.email,
    };
    axios(config)
      .then((Response) => {
        console.log(Response);
        dispatch(setuserdetails(Response.data));
      })
      .catch((err) => {
        console.log(err.Response);
      });
  }
  function validateuserdata() {
    let isvalid = true;
    var feilds = userdetailerror;
    var nameRegex = new RegExp(/^[a-zA-Z]+$/);
    if (userdetails.role === "vendor") {
      if (userdetail.shopName === "") {
        isvalid = false;
        feilds["shopName"] = "please enter shopName";
      } else {
        feilds["shopName"] = "";
      }
    }
    if (userdetail.phonenumber === "") {
      feilds["phonenumber"] = "please enter phonenumber";

      isvalid = false;
    } else {
      var phonenumbertester = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (phonenumbertester.test(userdetail.phonenumber)) {
        feilds["phonenumber"] = "";
      } else {
        feilds["phonenumber"] = "please enter valid phone number";
        isvalid = false;
      }
    }
    if (userdetail.firstName === "") {
      isvalid = false;
      feilds["firstName"] = "please enter FirstName";
    } else {
      if (!nameRegex.test(userdetail.firstName)) {
        isvalid = false;
        feilds["firstName"] = "*Please enter valid FirstName.";
      } else {
        feilds["firstName"] = "";
      }
    }
    if (userdetail.lastName === "") {
      isvalid = false;
      feilds["lastName"] = "please enter LastName";
    } else {
      if (!nameRegex.test(userdetail.lastName)) {
        isvalid = false;
        feilds["lastName"] = "*Please enter valid LastName.";
      } else {
        feilds["lastName"] = "";
      }
    }
    setuserdetailerror({ ...userdetailerror });
    return isvalid;
  }
  function updateuserdata(e) {
    if (validateuserdata()) {
      var config = {
        method: "put",
        url: "https://localhost:5001/api/Account/Updateuser",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userdetail),
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          AlertUsers(response);
          GetuserData();
          setuserdetailupdate(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  function handleuserdetailchange(e) {
    console.log(userdetail);
    var feilds = userdetail;
    feilds[e.target.name] = e.target.value;
    setuserdetail({ ...userdetail });
  }
  return (
    <div>
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
      <Row>
        <Col className="profileimageholder">
          <Image
            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
            roundedCircle
            style={{ width: "150px" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="firstName"
                    name="firstName"
                    value={userdetail.firstName}
                    onChange={handleuserdetailchange}
                    disabled={!userdetailsupdate}
                  />
                  <Form.Text className="error">
                    {userdetailerror.firstName}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    value={userdetail.lastName}
                    onChange={handleuserdetailchange}
                    disabled={!userdetailsupdate}
                  />
                  <Form.Text className="error">
                    {userdetailerror.lastName}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            {userdetails.role === "vendor" ? (
              <Form.Group>
                <Form.Label>ShopName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="shopName"
                  name="shopName"
                  value={userdetail.shopName}
                  onChange={handleuserdetailchange}
                  disabled={!userdetailsupdate}
                />
                <Form.Text className="error">
                  {userdetailerror.shopName}
                </Form.Text>
              </Form.Group>
            ) : (
              <></>
            )}

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="Email"
                placeholder="Email"
                name="Email"
                value={userdetail.Email}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="phonenumber"
                name="phonenumber"
                value={userdetail.phonenumber}
                onChange={handleuserdetailchange}
                disabled={!userdetailsupdate}
              />
              <Form.Text className="error">
                {userdetailerror.phonenumber}
              </Form.Text>
            </Form.Group>

            <Button
              variant="success"
              onClick={(e) => {
                if (userdetailsupdate) {
                  updateuserdata(e);
                } else {
                  setuserdetailupdate(!userdetailsupdate);
                }
              }}
            >
              {userdetailsupdate ? "edit" : "update"}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Userdetail;
