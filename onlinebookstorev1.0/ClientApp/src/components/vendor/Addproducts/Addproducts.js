import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Image, InputGroup } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import "./addproduct.css";
function Addproducts({ getusetdata }) {
  console.log(getusetdata);

  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userDetails);
  const [bookexist, setbookexist] = useState(false);
  const [bookdetails, setBookdetails] = useState({
    Title: "",
    ISBN: "",
    categories: "",
    CoverImage: "",
    publisher: "",
    pageCount: "",
    language: "",
    authors: "",
    Description: "",
    Quantity: "",
    price: "",
    discount: "",
  });
  const [bookerror, setbookerror] = useState({
    Title: "",
    ISBN: "",
    categories: "",
    authors: "",
    CoverImage: "",
    Description: "",
    publisher: "",
    pageCount: "",
    language: "",
    Quantity: "",
    price: "",
    discount: "",
  });
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
    // console.log(response);
  }
  function validatedata() {
    let isValid = true;
    var Feild = bookerror;
    if (bookdetails.Title.trim() === "") {
      isValid = false;
      Feild["Title"] = "please enter book title ";
    } else {
      Feild["Title"] = "";
    }
    if (bookdetails.CoverImage.trim() === "") {
      isValid = false;
      Feild["CoverImage"] = "please enter book CoverImageurl ";
    } else {
      Feild["CoverImage"] = "";
    }
    if (bookdetails.Description.trim() === "") {
      isValid = false;
      Feild["Description"] = "please enter book Description ";
    } else {
      Feild["Description"] = "";
    }
    if (bookdetails.authors.trim() === "") {
      isValid = false;
      Feild["authors"] = "please enter book authors ";
    } else {
      Feild["authors"] = "";
    }
    if (bookdetails.Title.trim() === "") {
      isValid = false;
      Feild["Title"] = "please enter book title ";
    } else {
      Feild["Title"] = "";
    }
    if (bookdetails.categories.trim() === "") {
      isValid = false;
      Feild["categories"] = "please enter book categories ";
    } else {
      Feild["categories"] = "";
    }
    if (bookdetails.language.trim() === "") {
      isValid = false;
      Feild["language"] = "please enter book language ";
    } else {
      Feild["language"] = "";
    }
    if (bookdetails.pageCount <= 0) {
      isValid = false;
      Feild["pageCount"] = "please enter book pageCount ";
    } else {
      Feild["pageCount"] = "";
    }
    if (bookdetails.publisher.trim() === "") {
      isValid = false;
      Feild["publisher"] = "please enter book publisher ";
    } else {
      Feild["publisher"] = "";
    }
    console.log("discount", typeof bookdetails.discount);
    if (Number(bookdetails.discount) < 0 || isNaN(bookdetails.discount)) {
      isValid = false;
      Feild["discount"] = "please enter valid book discount ";
    } else {
      Feild["discount"] = "";
    }
    console.log("Quantity", bookdetails.Quantity);
    if (Number(bookdetails.Quantity) <= 0 || isNaN(bookdetails.Quantity)) {
      isValid = false;
      Feild["Quantity"] = "please enter valid book Quantity ";
    } else {
      Feild["Quantity"] = "";
    }
    console.log("price", bookdetails.price);
    if (Number(bookdetails.price) <= 0 || isNaN(bookdetails.Quantity)) {
      isValid = false;
      Feild["price"] = "please enter valid book price ";
    } else {
      Feild["price"] = "";
    }
    var isbnvalidator = new RegExp(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm
    );
    if (bookdetails.ISBN === "") {
      isValid = false;
      Feild["ISBN"] = "please enter book ISBN ";
    } else {
      if (!isbnvalidator.test(bookdetails.ISBN)) {
        isValid = false;
        Feild["ISBN"] = "please enter valid Isbn number";
      } else {
        Feild["ISBN"] = "";
      }
    }
    setbookerror({ ...bookerror });
    return isValid;
  }
  function addproduct(e) {
    console.log("stubmit");
    if (validatedata()) {
      console.log(userdetails);
      var data = {
        Title: bookdetails.Title,
        ISBN: bookdetails.ISBN,
        publisher: bookdetails.publisher,
        pageCount: bookdetails.pageCount,
        Description: bookdetails.Description,
        language: bookdetails.language,
        authors: bookdetails.authors.split(","),
        categories: bookdetails.categories.split(","),
        CoverImage: bookdetails.CoverImage,
      };
      var product = {
        book: data,
        vendor_Id: userdetails.id,
        Quantity: bookdetails.Quantity,
        price: bookdetails.price,
        DiscountPercent: bookdetails.discount,
      };
      console.log(product);
      var config = {
        method: "post",
        url: "https://localhost:5001/api/product",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(product),
      };
      axios(config)
        .then((response) => {
          console.log(response.data);

          AlertUsers(response);
          getusetdata();
        })
        .catch((err) => {
          console.log(err.response);
          AlertUsers(err.response);
        });
    }
  }
  function handlebookchange(e) {
    let feilds = bookdetails;
    feilds[e.target.name] = e.target.value;
    setBookdetails({ ...bookdetails });
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
      <div className="addproduct">
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Title"
              name="Title"
              value={bookdetails.Title}
              onChange={handlebookchange}
            />
            <Button
              style={{ marginTop: "5px" }}
              onClick={() => {
                if (bookdetails.Title !== "") {
                  var config = {
                    method: "get",
                    url:
                      "https://localhost:5001/api/book/findbytitle/" +
                      bookdetails.Title,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  };
                  axios(config)
                    .then((response) => {
                      console.log(response.data);
                      setbookexist(true);
                      setBookdetails({
                        Title: response.data.title,
                        ISBN: response.data.isbn,
                        CoverImage: response.data.coverImage,
                        Description: response.data.description,
                        categories: response.data.categories.join(","),
                        authors: response.data.authers
                          .map((s) => s.authername)
                          .join(","),
                        language: response.data.language,
                        pageCount: response.data.pageCount,
                        publisher: response.data.publisher,
                      });
                    })
                    .catch((err) => {
                      console.log(err.response);
                      setbookexist(false);
                      setBookdetails({
                        Title: "",
                        ISBN: "",
                        categories: "",
                        CoverImage: "",
                        publisher: "",
                        pageCount: 0,
                        language: "",
                        authors: "",
                        Description: "",
                        Quantity: 0,
                        price: 0,
                        discount: 0,
                      });
                      AlertUsers(err.response);
                    });
                }
              }}
            >
              GetByTitle{" "}
            </Button>
            <Form.Text className="error">{bookerror.Title}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="ISBN"
              name="ISBN"
              value={bookdetails.ISBN}
              onChange={handlebookchange}
            />
            <Button
              style={{ marginTop: "5px" }}
              onClick={() => {
                if (bookdetails.ISBN !== "") {
                  var config = {
                    method: "get",
                    url: "https://localhost:5001/api/Book/" + bookdetails.ISBN,
                  };
                  axios(config)
                    .then((response) => {
                      console.log(response.data);
                      setbookexist(true);
                      setBookdetails({
                        Title: response.data.title,
                        ISBN: response.data.isbn,
                        CoverImage: response.data.coverImage,
                        Description: response.data.description,
                        categories: response.data.categories.join(","),
                        authors: response.data.authers
                          .filter((s) => s.authername)
                          .join(","),
                        language: response.data.language,
                        pageCount: response.data.pageCount,
                        publisher: response.data.publisher,
                      });
                    })
                    .catch((err) => {
                      setbookexist(false);
                      setBookdetails({
                        Title: "",
                        ISBN: "",
                        categories: "",
                        CoverImage: "",
                        publisher: "",
                        pageCount: 0,
                        language: "",
                        authors: "",
                        Description: "",
                        Quantity: 0,
                        price: 0,
                        discount: 0,
                      });
                      console.log(err.response);
                      AlertUsers(err.response);
                    });
                }
              }}
            >
              GetByisbn{" "}
            </Button>
            <Form.Text className="error">{bookerror.ISBN}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>CoverImageUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder="CoverImage"
              name="CoverImage"
              value={bookdetails.CoverImage}
              onChange={handlebookchange}
              disabled={bookexist}
            />

            <Form.Text className="error">{bookerror.CoverImage}</Form.Text>
            <Image
              src={bookdetails.CoverImage}
              thumbnail
              style={{ width: "150px" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>categories</Form.Label>
            <Form.Control
              type="text"
              placeholder="categories1,categories2"
              name="categories"
              value={bookdetails.categories}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.categories}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Authors</Form.Label>
            <Form.Control
              type="text"
              placeholder="author1,auther2 "
              name="authors"
              value={bookdetails.authors}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.authors}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>publisher</Form.Label>
            <Form.Control
              type="text"
              placeholder="publisher"
              name="publisher"
              value={bookdetails.publisher}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.publisher}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>pageCount</Form.Label>
            <Form.Control
              type="Number"
              placeholder="pageCount"
              name="pageCount"
              value={bookdetails.pageCount}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.pageCount}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>language</Form.Label>
            <Form.Control
              type="text"
              placeholder="language"
              name="language"
              value={bookdetails.language}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.language}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="Description"
              value={bookdetails.Description}
              onChange={handlebookchange}
              disabled={bookexist}
            />
            <Form.Text className="error">{bookerror.Description}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Quantity"
              name="Quantity"
              value={bookdetails.Quantity}
              onChange={handlebookchange}
            />
            <Form.Text className="error">{bookerror.Quantity}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>price</Form.Label>
            <InputGroup>
              <Form.Control
                type="Number"
                placeholder="pageCount"
                name="price"
                value={bookdetails.price}
                onChange={handlebookchange}
              />
              <InputGroup.Append>
                <InputGroup.Text>₹</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <Form.Text className="error">{bookerror.price}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>discountPercent</Form.Label>
            <InputGroup>
              <Form.Control
                type="Number"
                placeholder="discount"
                name="discount"
                value={bookdetails.discount}
                onChange={handlebookchange}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            <Form.Text className="error">{bookerror.discount}</Form.Text>
          </Form.Group>
        </Form>
        <Button onClick={addproduct}>addproduct</Button>
      </div>
    </div>
  );
}

export default Addproducts;
