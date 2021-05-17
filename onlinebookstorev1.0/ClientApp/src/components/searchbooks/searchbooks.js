import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Row, Col, Form, Button, Spinner, Image } from "react-bootstrap";
import "./searchbook.css";
import axios from "axios";
function Bookslist({ booklist, searchtype, searchValue }) {
  var books = booklist.filter((book) => {
    return book[searchtype]
      .toString()
      .trim()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase());
  });
  console.log(books);
  var renderdbooks = books.map((book) => {
    return (
      <div className="searchbooksresult" key={book.isbn}>
        <Row>
          <Col xs={4} sm={3} className="searchreasultcoverimage">
            <Link to={`/book/${book.isbn}`}>
              <Image src={book.coverImage} thumbnail />
            </Link>
          </Col>
          <Col xs={8} sm={9} className="searchreasultvalue">
            <Row>
              <Col>
                <span className="searchreasultparams">
                  <b>{book.title}</b>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="searchreasultparams">
                  <b>By </b>

                  {book.authers}
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <span className="searchreasultparams">
                  <b>categories </b>

                  {book.categories}
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <span className="searchreasultparams">
                  <b>language : </b>

                  {book.language}
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <span className="searchreasultparams">
                  <b>pageCount : </b>
                  {book.pageCount}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="searchreasultparams">
                  <b>publisher : </b>
                  {book.publisher}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  });
  if (renderdbooks.length === 0) {
    return (
      <div
        className="searchbookcontainer"
        Style="justify-conent:center;display: flex;"
      >
        {" "}
        <b Style="margin: auto;">No Result found</b>
      </div>
    );
  }
  return <div className="searchbookcontainer">{renderdbooks}</div>;
}
function Searchbooks() {
  const search = useLocation().search;
  const [type, settype] = useState("authers");
  const [value, setvalue] = useState("");
  const [book, setbooks] = useState([]);
  const [loading, setloading] = useState(false);
  const urltype = new URLSearchParams(search).get("type");
  const urlvalue = new URLSearchParams(search).get("value");

  useEffect(() => {
    if (urltype === null) {
      console.log("it is unfedined");
    } else {
      setvalue(urlvalue);
      settype(urltype);
      console.log(urlvalue, urltype);
    }
    setloading(true);
    var config = {
      method: "get",
      url: "https://localhost:5001/api/Book",
    };

    axios(config)
      .then((response) => {
        var bookdata = response.data.map((book) => {
          return {
            isbn: book.isbn,
            language: book.language,
            pageCount: book.pageCount,
            publisher: book.publisher,
            coverImage: book.coverImage,
            title: book.title,
            authers: book.authers.join(","),
            categories: book.categories.join(","),
          };
        });
        setbooks(bookdata);
        setloading(false);
        console.log(bookdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleChange(e) {
    if (e.target.name === "value") {
      setvalue(e.target.value);
    } else if (e.target.name === "type") {
      settype(e.target.value);
    }
    console.log(type, value);
  }
  return (
    <div className="Searchpage">
      <div className="searchcolum">
        <Form className="searchbar">
          <Form.Control
            value={value}
            placeholder="What are you looking for?"
            className="Searchinput"
            name="value"
            onChange={handleChange}
          />
          <select
            value={type}
            className="selectinput"
            name="type"
            onChange={handleChange}
          >
            <option value="authers" className="selectoption">
              Auther
            </option>
            <option value="categories" className="selectoption">
              Cartegory
            </option>
            <option value="title" className="selectoption">
              Title
            </option>
          </select>
          <Button className="searchbutton">Search</Button>
        </Form>
      </div>
      {!loading ? (
        <Bookslist booklist={book} searchtype={type} searchValue={value} />
      ) : (
        <div className="searchpagespinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default Searchbooks;
