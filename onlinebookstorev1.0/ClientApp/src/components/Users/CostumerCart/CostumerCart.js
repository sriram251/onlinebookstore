import React, { useState } from "react";
import { Col, Row, Image, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { setuserdetails } from "../../../action";
import axios from "axios";
function CostumerCart() {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [CartitemTodelet, setCartitemTodelet] = useState("");
  const userdetails = useSelector((state) => state.userDetails);
  console.log(userdetails);
  if (userdetails.usercart.lenght === 0) {
    return <div>No cart items is avaliable</div>;
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
  return (
    <div>
      {userdetails.usercart.map((product) => {
        return (
          <Row key={product.bookName.isbn}>
            <Col>
              <div>
                <Row>
                  <Col xs={4} sm={3}>
                    <Image src={product.coverimage} thumbnail />
                  </Col>
                  <Col xs={8} sm={9}>
                    <Row>
                      <Col>
                        <span className="searchreasultparams">
                          <b>{product.bookName.title}</b>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="searchreasultparams">
                          <b>price : {product.provider.price} ₹</b>
                        </span>
                      </Col>
                      <Col className="searchreasultparams">
                        <b>Quantity : {product.quantity} </b>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="searchreasultparams">
                          <b>price : {product.provider.discount} %</b>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="searchreasultparams">
                        <b>shop : {product.provider.shopname}</b>
                      </Col>
                      <Col>
                        <Button
                          size="sm"
                          onClick={() => {
                            setCartitemTodelet(product.bookId);
                            setshow(true);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        );
      })}
      <Modal
        show={show}
        onHide={() => {
          setshow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to remove this product </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setshow(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              var config = {
                method: "delete",
                url: "https://localhost:5001/api/Cart",
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify({
                  BookId: CartitemTodelet,
                  user_Id: userdetails.id,
                }),
              };
              axios(config)
                .then((Response) => {
                  console.log(Response);
                  setshow(false);
                  GetuserData();
                })
                .catch((err) => {
                  console.log(err.Response);
                });
              console.log(CartitemTodelet);
              setCartitemTodelet("");
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CostumerCart;
