import React, { useState } from "react";
import { Table, InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import axios from "axios";
import { setuserdetails } from "../../../action";
function ViewProducts() {
  const dispatch = useDispatch();
  var userdetails = useSelector((state) => state.userDetails);
  const [productTodelet, setproductdelet] = useState("");
  const [editvalue, SetEditvalue] = useState({});
  const [errorchange, seterror] = useState({});
  const [show, setshow] = useState(false);
  console.log(userdetails);
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
  function validatedata() {
    var isValid = true;
    let Feild = errorchange;

    if (Number(editvalue.quantity) <= 0 || isNaN(editvalue.quantity)) {
      isValid = false;
      console.log("quantity fails ", Number(editvalue.quantity));
      Feild["quantity"] = true;
    } else {
      console.log("quantity is ok ", Number(editvalue.quantity));
      Feild["quantity"] = false;
    }

    if (Number(editvalue.discount) < 0 || isNaN(editvalue.discount)) {
      isValid = false;
      Feild["discount"] = true;
      console.log("discount fails ", Number(editvalue.discount));
    } else {
      Feild["discount"] = false;
      console.log("discount is ok ", Number(editvalue.discount));
    }

    if (Number(editvalue.price) <= 0 || isNaN(editvalue.price)) {
      isValid = false;
      Feild["price"] = true;
      console.log("price fails", Number(editvalue.price));
    } else {
      Feild["price"] = false;
      console.log("price is ok", Number(editvalue.price));
    }
    seterror({ ...errorchange });
    return isValid;
  }
  function updatedata(e) {
    if (validatedata()) {
      console.log(editvalue);
      var data = {
        productId: editvalue.productId,
        Quantity: editvalue.quantity,
        price: editvalue.price,
        DiscountPercent: editvalue.discount,
      };
      var config = {
        method: "put",
        url: "https://localhost:5001/api/product",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };
      axios(config)
        .then((response) => {
          console.log(response);
          GetuserData();
          SetEditvalue({});
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }
  function handleChange(e) {
    let feild = editvalue;
    feild[e.target.name] = e.target.value;
    SetEditvalue({ ...editvalue });
    console.log(editvalue);
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Quantity</th>
            <th>price</th>
            <th>Discount</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {userdetails.avaliableproducts.map((product) => {
            console.log(editvalue.productId === product.productId);
            return (
              <tr key={product.productId}>
                <td>{product.bookName}</td>
                <td>
                  {!(editvalue.productId === product.productId) ? (
                    product.quantity
                  ) : (
                    <InputGroup>
                      <FormControl
                        aria-describedby="basic-addon1"
                        value={editvalue.quantity}
                        type="number"
                        name="quantity"
                        onChange={handleChange}
                        isInvalid={errorchange.quantity}
                      />
                    </InputGroup>
                  )}
                </td>
                <td>
                  {" "}
                  {!(editvalue.productId === product.productId) ? (
                    product.price + " ₹"
                  ) : (
                    <InputGroup>
                      <FormControl
                        aria-describedby="basic-addon1"
                        name="price"
                        value={editvalue.price}
                        type="number"
                        onChange={handleChange}
                        isInvalid={errorchange.price}
                      />
                    </InputGroup>
                  )}
                </td>
                <td>
                  {!(editvalue.productId === product.productId) ? (
                    product.discount + " %"
                  ) : (
                    <InputGroup>
                      <FormControl
                        aria-describedby="basic-addon1"
                        value={editvalue.discount}
                        type="number"
                        name="discount"
                        onChange={handleChange}
                        isInvalid={errorchange.discount}
                      />
                    </InputGroup>
                  )}
                </td>
                <td>
                  {!(editvalue.productId === product.productId) ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        SetEditvalue(product);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={updatedata}>
                      <UpdateIcon />
                    </Button>
                  )}
                </td>

                <td>
                  <Button
                    size="sm"
                    onClick={() => {
                      setproductdelet(product.productId);
                      setshow(true);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
                url: "https://localhost:5001/api/product/" + productTodelet,
                headers: {
                  "Content-Type": "application/json",
                },
              };
              axios(config)
                .then((Response) => {
                  console.log(Response);
                  GetuserData();
                  setshow(false);
                  setproductdelet("");
                })
                .catch((err) => {
                  console.log(err.Response);
                });
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewProducts;
