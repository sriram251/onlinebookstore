import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Spinner, Form, Button } from "react-bootstrap";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { razerpay_public_Key } from "../../Keyvaliables/Keyvariables";
import "./checkoutpage.css";
function Checkoutpage() {
  const userdetails = useSelector((state) => state.userDetails);
  const [quantity, setquantity] = useState(1);
  const [userdetail, setuserdetail] = useState({
    Email: userdetails.email,
    Address: `${userdetails.adresses[0].address} ${userdetails.adresses[0].city} ${userdetails.adresses[0].district}-${userdetails.adresses[0].pincode}`,
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
  const [book, setBook] = useState({});
  let { isbn } = useParams();
  console.log(book);
  // to get the book data when the component and add razer pay window to the application
  useEffect(() => {
    var config = {
      method: "get",
      url: "https://localhost:5001/api/Book/" + isbn,
    };
    axios(config).then((response) => {
      var authername = response.data.authers.map((auther) => {
        return auther.autherName;
      });
      var changeddata = response.data;
      changeddata["authername"] = authername.join(",");

      setBook(changeddata);
    });
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // validate user data
  function validateuserdata() {
    let isvalid = true;
    var feilds = userdetailerror;
    var nameRegex = new RegExp(/^[a-zA-Z]+$/);
    if (userdetail.phonenumber === "") {
      feilds["phonenumber"] = "please enter phonenumber";

      isvalid = false;
    } else {
      var phonenumbertester =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
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
  // handle changes in form input
  function makePayment() {
    if (validateuserdata()) {
      const options = {
        key: razerpay_public_Key,
        amount: (quantity * Number(book.provider[0].price) * 100).toString(),
        name: book.provider[0].shopname,
        description: "Book",
        image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: userdetail.firstName + " " + userdetail.lastName,
          contact: userdetail.phonenumber,
          email: userdetail.Email,
        },
        notes: {
          address: userdetail.Address,
          quantity: quantity,
        },
        theme: {
          color: "blue",
          hide_topbar: false,
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  }
  function handleuserdetailchange(e) {
    // console.log(userdetail);
    if (e.target.name === "Address") {
      console.log("this is the address ", e.target.selectedOptions);
    }
    var feilds = userdetail;
    feilds[e.target.name] = e.target.value;
    setuserdetail({ ...userdetail });
  }
  if (book.title !== undefined) {
    var catogory = book.categories.join(",");
    return (
      <div className="checkoutpage">
        <Row>
          <Col xs={12} sm={6}>
            <Row>
              <Col xs={12} className="checkoutCoverimage">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="viewbookcoverimage"
                />
              </Col>
              <Col xs={12} className="Viewbookdetails">
                <Row>
                  <Col>
                    <span className="viewbooktitle">{book.title}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="viewbookauther">
                      <b>By</b>
                      <br />
                      {book.authername}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="viewbookauther">
                      <b>categories</b>
                      <br />
                      {catogory}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="viewbookauther">
                      <b>language : </b>

                      {book.language}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <span className="viewbookauther">
                      <b>pageCount : </b>
                      {book.pageCount}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="viewbookauther">
                      <b>publisher : </b>
                      {book.publisher}
                    </span>
                  </Col>
                </Row>
                {book.provider.length === 0 ? (
                  <Row>
                    <Col>
                      <h6
                        style={{
                          color: "#cd2222",
                          fontsize: "12px",
                          marginTop: "3px",
                        }}
                      >
                        Out of stock
                      </h6>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col>
                      <span className="viewbookauther">
                        <b>price : </b>
                        {book.provider[0].price} ₹
                      </span>
                    </Col>
                    <Col>
                      <span className="viewbookauther">
                        <b>quantity : </b>

                        <AddIcon
                          style={{ marginright: "2px" }}
                          type="button"
                          onClick={() => {
                            setquantity(quantity + 1);
                          }}
                        />
                        <b> {quantity}</b>
                        <RemoveIcon
                          style={{ marginleft: "2px" }}
                          type="button"
                          onClick={() => {
                            if (quantity > 1) {
                              setquantity(quantity - 1);
                            }
                          }}
                        />
                      </span>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={6} className="checkoutuserdetail">
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
                    />
                    <Form.Text className="error">
                      {userdetailerror.lastName}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
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
                />
                <Form.Text className="error">
                  {userdetailerror.phonenumber}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="Address"
                  value={userdetail.Address}
                  onChange={handleuserdetailchange}
                >
                  {userdetails.adresses.map((address) => {
                    return (
                      <option address_id={address.Address_Id}>
                        {address.address} {address.city} {address.district}-
                        {address.pincode}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text" value={quantity} disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control
                  type="text"
                  value={`${quantity * Number(book.provider[0].price)} ₹`}
                  disabled
                />
              </Form.Group>
              <Button variant="success" onClick={makePayment}>
                Make payment
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className="checkoutpagespinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Checkoutpage;
