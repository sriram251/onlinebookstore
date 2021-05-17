import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./viewbook.css";
import { Alert } from "@material-ui/lab";
import ShopIcon from "@material-ui/icons/Shop";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import { setuserdetails } from "../../action";
function Viewbook() {
  const dispatch = useDispatch();
  const path = useHistory();
  const [alertuser, setalert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  var userdetails = useSelector((state) => state.userDetails);
  let { isbn } = useParams();
  const [book, setBook] = useState({});
  const [readmore, setreadmore] = useState(false);
  const [quantity, setquantity] = useState(1);
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
  useEffect(() => {
    var config = {
      method: "get",
      url: "https://localhost:5001/api/Book/" + isbn,
    };
    axios(config).then((response) => {
      console.log(response);
      var authername = response.data.authers.map((auther) => {
        return auther.autherName;
      });
      var changeddata = response.data;
      changeddata["authername"] = authername.join(",");

      setBook(changeddata);
    });
  }, []);
  var catogory = "";
  var autherimages = [];
  if (book.title !== undefined) {
    catogory = book.categories.join(",");
    autherimages = book.authers.map((auther) => {
      if (auther.autherImageUrl !== null) {
        return (
          <div className="autherimageholder">
            <Image
              src={auther.autherImageUrl}
              alt="auther image"
              roundedCircle
              className="autherimages"
            />
            <b>{auther.autherName}</b>
          </div>
        );
      }
    });
    return (
      <Container className="Viewbookpage">
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
          <Col xs={12} sm={4} className="coverimageviewer">
            <img
              src={book.coverImage}
              alt={book.title}
              className="viewbookcoverimage"
            />
          </Col>
          <Col xs={12} sm={7} className="Viewbookdetails">
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
        {/* From this it is below the cover  image */}
        <Row>
          <Col xs={12} sm={4}>
            <Row>
              <Col className="buttoncontainer">
                <button
                  className="AddTocartbutton"
                  disabled={
                    userdetails.role === "vendor" || book.provider.length === 0
                  }
                  onClick={() => {
                    if (userdetails.role === undefined) {
                      path.push("/Login");
                    }
                    var cartitem = {
                      BookId: book.bookid,
                      user_Id: userdetails.id,
                      vendor_Id: book.provider[0].vendor_Id,
                      price: book.provider[0].price,
                      status: "Cart",
                      quantity: quantity,
                    };
                    var config = {
                      method: "post",
                      url: "https://localhost:5001/api/Cart",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: JSON.stringify(cartitem),
                    };
                    axios(config)
                      .then((response) => {
                        GetuserData();
                        AlertUsers(response);
                        console.log(response.data);
                      })
                      .catch((err) => {
                        AlertUsers(err.response);
                        console.log(err.response);
                      });
                  }}
                >
                  <ShoppingCartIcon /> Add to Cart
                </button>
              </Col>
            </Row>
            <Row>
              <Col className="buttoncontainer">
                <button
                  className="AddTocartbutton"
                  disabled={
                    userdetails.role === "vendor" || book.provider.length === 0
                  }
                  onClick={() => {
                    if (userdetails.role === undefined) {
                      path.push("/Login");
                    } else {
                      if (userdetails.adresses.length === 0) {
                        setalert({
                          open: true,
                          message: "Please add address in your profile",
                          type: "error",
                        });

                        setTimeout(() => {
                          setalert({ ...alertuser, open: false });
                        }, 5000);
                      } else {
                        path.push(`/Checkout/${isbn}`);
                      }
                    }
                  }}
                >
                  {" "}
                  <ShopIcon /> Buy Now
                </button>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={7}>
            <Row>
              <Col
                className={`viewbookdescription ${
                  readmore ? "expanddiscription" : ""
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: book.description,
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <a
                  className="readmore"
                  onClick={() => {
                    setreadmore(!readmore);
                  }}
                >
                  {readmore ? "Read less" : "Read more"}
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* auther details */}
        <Row className="autherholders">
          <Col>
            <Row>
              <Col>
                <span className="viewbooktitle">Authers</span>
              </Col>
            </Row>
            <Row>
              <Col>{autherimages}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div className="viewpagespinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Viewbook;
