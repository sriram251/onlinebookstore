import React, { useState } from "react";
import { Row, Col, Form, Tab, Button, Modal, Nav } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";

import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import { setuserdetails } from "../../action";
import { Alert } from "@material-ui/lab";
import Userinfo from "./Userdetail";
import Addproducts from "./Addproducts/Addproducts";
import Viewproduct from "./viewProducts/ViewProducts";
import "./vendorpage.css";
import axios from "axios";
function Vendorpage() {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userDetails);
  let { path, url } = useRouteMatch();
  //   address changes
  const [addaddressmodal, setAddaddressModal] = useState(false);
  const [addaddress, setaddaddress] = useState({
    Email: userdetails.email,
    Address: "",
    City: "",
    State: "",
    Country: "",
    Pincode: "",
    District: "",
  });
  const [AddressError, SetAddressError] = useState({
    Address: "",
    City: "",
    State: "",
    Country: "",
    Pincode: "",
    District: "",
  });
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // To refresh user data
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
  // TO validate address
  function validateaddress() {
    var Isvalid = true;
    var feilds = AddressError;
    var nameRegex = new RegExp(/^[a-zA-Z ]+$/);
    if (addaddress.Address === "") {
      Isvalid = false;
      feilds["Address"] = "please enter Address";
    } else {
      feilds["Address"] = "";
    }
    if (addaddress.City === "") {
      Isvalid = false;
      feilds["City"] = "please enter City";
    } else {
      if (!nameRegex.test(addaddress.City)) {
        Isvalid = false;
        feilds["City"] = "*Please enter valid City.";
      } else {
        feilds["City"] = "";
      }
    }

    if (addaddress.State === "") {
      Isvalid = false;
      feilds["State"] = "please enter State";
    } else {
      if (!nameRegex.test(addaddress.State)) {
        Isvalid = false;
        feilds["State"] = "*Please enter valid State.";
      } else {
        feilds["State"] = "";
      }
    }

    if (addaddress.Country === "") {
      Isvalid = false;
      feilds["Country"] = "please enter Country";
    } else {
      if (!nameRegex.test(addaddress.Country)) {
        Isvalid = false;
        feilds["Country"] = "*Please enter valid Country.";
      } else {
        feilds["Country"] = "";
      }
    }

    if (addaddress.District === "") {
      Isvalid = false;
      feilds["District"] = "please enter District";
    } else {
      if (!nameRegex.test(addaddress.District)) {
        Isvalid = false;
        feilds["District"] = "*Please enter valid District.";
      } else {
        feilds["District"] = "";
      }
    }
    if (addaddress.Pincode === "") {
      Isvalid = false;
      feilds["Pincode"] = "please enter Pincode";
    } else {
      if (!new RegExp(/^[1-9][0-9]{5}$/).test(addaddress.Pincode)) {
        Isvalid = false;
        feilds["Pincode"] = "*Please enter valid Pincode.";
      } else {
        feilds["Pincode"] = "";
      }
    }
    SetAddressError({ ...AddressError });

    return Isvalid;
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
  // TO add addresss to the user
  function handleAddesssubmit(e) {
    if (validateaddress()) {
      console.log(addaddress);
      var config = {
        method: "post",
        url: "https://localhost:5001/api/Address",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
        },
        data: JSON.stringify(addaddress),
      };
      axios(config)
        .then((response) => {
          console.log(response);
          AlertUsers(response);
          GetuserData();
          setAddaddressModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleaddresschange(e) {
    var feilds = addaddress;
    feilds[e.target.name] = e.target.value;

    setaddaddress({ ...addaddress });
  }
  // userdetails component

  return (
    <div className="vendorpage">
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
      <Tab.Container defaultActiveKey="userdetail">
        <Row className="vendordatas">
          <Col xs={9} sm={3} className="vendornavigation">
            <Nav className="flex-column navlinks">
              <Link to={`${url}`}>userdetail</Link>
              <Link to={`${url}/Addproducts`}>Addproducts</Link>
              <Link to={`${url}/products`}>products</Link>
              <Link to={`${url}/orders`}>orders</Link>
              <Link to={`${url}/sold`}>sold</Link>
            </Nav>
          </Col>
          <Col xs={12} sm={8} className="vendorviewitems">
            <Switch>
              <Route exact path={path}>
                <Userinfo />
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      onClick={() => {
                        setAddaddressModal(true);
                      }}
                      style={{ marginTop: "5px" }}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Col>
                  {userdetails.adresses.map((address) => {
                    return (
                      <Col
                        xs={12}
                        className="PeopleAddressesContainer"
                        key={address.address_Id}
                      >
                        <span style={{ display: "inline-block" }}>
                          {address.address} {address.city} {address.district}-
                          {address.pincode}
                        </span>
                        <DeleteIcon
                          type="button"
                          onClick={() => {
                            console.log(`delete address ${address.address_Id}`);
                            var config = {
                              method: "delete",
                              url:
                                "https://localhost:5001/api/Address/" +
                                address.address_Id,
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                credentials: "include",
                              },
                            };
                            axios(config)
                              .then((response) => {
                                console.log(response);
                                AlertUsers(response);
                                GetuserData();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Route>
              <Route path={`${path}/Addproducts`}>
                <h4>Add products</h4>
                <Addproducts getusetdata={GetuserData} />
              </Route>
              <Route path={`${path}/products`}>
                <h4>products</h4>
                <Viewproduct />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
      {/* Modal to add user address */}
      <Modal
        show={addaddressmodal}
        onHide={() => {
          setAddaddressModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Address"
                name="Address"
                value={addaddress.Address}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.Address}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pincode"
                name="Pincode"
                value={addaddress.Pincode}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.Pincode}</Form.Text>
            </Form.Group>
            <Button
              variant="secondary"
              onClick={() => {
                if (addaddress.Pincode !== "") {
                  if (new RegExp(/^[1-9][0-9]{5}$/).test(addaddress.Pincode)) {
                    var pincodeconfig = {
                      method: "get",
                      url:
                        "https://api.postalpincode.in/pincode/" +
                        addaddress.Pincode,
                    };

                    axios(pincodeconfig).then(function (response) {
                      console.log(response.data[0].PostOffice[0]);
                      setaddaddress({
                        ...addaddress,
                        City: response.data[0].PostOffice[0].Block,
                        District: response.data[0].PostOffice[0].District,
                        State: response.data[0].PostOffice[0].State,
                        Country: response.data[0].PostOffice[0].Country,
                      });
                    });
                  }
                }
              }}
            >
              Get location
            </Button>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="District"
                name="District"
                value={addaddress.District}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.District}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="City"
                value={addaddress.City}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.City}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="State"
                value={addaddress.State}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.State}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="Country"
                value={addaddress.Country}
                onChange={handleaddresschange}
              />
              <Form.Text className="error">{AddressError.Country}</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setAddaddressModal(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddesssubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Vendorpage;
