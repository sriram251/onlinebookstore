import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./homepage.css";
import axios from "axios";
function Homepage() {
  const [values, setValues] = useState([]);
  function Category({ values }) {
    let filterddata = values.filter((data) => {
      return data.books.length > 7;
    });

    var rendereddata = filterddata.map((value) => {
      return (
        <div className="individulacatogory" key={value.cartegory}>
          <div className="categoryheader">
            <h4>{value.cartegory}</h4>
            <Link to={`/search/?type=categories&value=${value.cartegory}`}>
              <Button>view all </Button>
            </Link>
          </div>
          <div className="bookcontainer">
            {value.books.splice(0, 7).map((book) => {
              return (
                <div className="individualbook" key={book.isbn}>
                  <div className="imagecontainer" key={book.isbn}>
                    <Link to={`/book/${book.isbn}`}>
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="coverimage"
                      />
                    </Link>
                  </div>
                  <div className="bookdetails">
                    <span style={{ Display: "block" }}>{book.title}</span>
                    {book.price !== null ? (
                      <h6
                        style={{
                          color: "black",
                          fontsize: "12px",
                          marginTop: "3px",
                        }}
                      >
                        {book.price.price} ₹
                      </h6>
                    ) : (
                      <h6
                        style={{
                          color: "#cd2222",
                          fontsize: "12px",
                          marginTop: "3px",
                        }}
                      >
                        Out of stock
                      </h6>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    console.log(rendereddata);
    return <div>{rendereddata}</div>;
  }
  useEffect(() => {
    let config = {
      method: "get",
      url: "https://localhost:5001/api/category",
      Headers: { "Content-Type": "application/json" },
    };

    axios(config)
      .then((response) => {
        setValues(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <div className="Homepage">
      <div>
        <Carousel className="imagescrollerbanner">
          <Carousel.Item>
            <img
              className="w-100 scrollerimages"
              src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="contents">
        <Category values={values} />
      </div>
    </div>
  );
}

export default Homepage;
