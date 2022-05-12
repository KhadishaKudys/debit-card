import React, { useState } from "react";
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import "../assets/styles/payment.css";
import { Link } from "react-router-dom";
import visa from "../assets/static/visa-logo.png";
import { useDispatch } from "react-redux";
import mastercard from "../assets/static/mastercard-logo.png";
import { nanoid } from "@reduxjs/toolkit";
import { addCardInfo } from "../store/paymentsSlice";

const Payment = () => {
  const [cvv, setCvv] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [dateError, setDateError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const alertDisable = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const addCard = () => {
    dispatch(
      addCardInfo({
        id: nanoid(),
        number: sessionStorage.getItem("number"),
        month: sessionStorage.getItem("month"),
        year: sessionStorage.getItem("year"),
        name: sessionStorage.getItem("name"),
        cvv: sessionStorage.getItem("cvv"),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      pay();
    }
  };

  const pay = async () => {
    const card_info = {
      cvv: sessionStorage.getItem("cvv"),
      month: sessionStorage.getItem("month"),
      number: sessionStorage.getItem("number"),
      name: sessionStorage.getItem("name"),
      year: sessionStorage.getItem("year"),
    };
    await fetch("https://www.heroku.com/api/payment/pay", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card_info),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log("OK");
          addCard();
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        } else {
          console.log("If something is wrong");
        }
      })
      .catch((err) => {
        console.log("It is just a test, so the request wasn't successful");
        addCard();
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      });
  };

  const validate = () => {
    let cvvError = "";
    let dateError = "";
    let numberError = "";
    let nameError = "";
    var reg = /^[a-zA-Z\s]*$/;
    var reg2 = /^\d+$/;
    if (sessionStorage.getItem("number") === "") {
      numberError = "⚠️ Credit card number cannot be empty";
    } else {
      if (
        sessionStorage.getItem("number").length < 16 ||
        sessionStorage.getItem("number").length > 16
      ) {
        numberError = "⚠️ Credit card number must consist of 16 digits";
      }
      if (!reg2.test(sessionStorage.getItem("number"))) {
        numberError = "⚠️ Invalid credit card number";
      }
    }
    if (sessionStorage.getItem("cvv") === "") {
      cvvError = "⚠️ CVV number cannot be empty";
    } else {
      if (
        sessionStorage.getItem("cvv").length < 3 ||
        sessionStorage.getItem("cvv").length > 3
      ) {
        cvvError = "⚠️ CVV number must consist of 3 digits";
      }
      if (!reg2.test(sessionStorage.getItem("cvv"))) {
        cvvError = "⚠️ Invalid CVV number";
      }
    }
    if (
      sessionStorage.getItem("month") === "" ||
      sessionStorage.getItem("year") === ""
    ) {
      dateError = "⚠️ Date must be complete";
    } else {
      if (
        parseInt(sessionStorage.getItem("month")) < 0 ||
        parseInt(sessionStorage.getItem("month")) > 12 ||
        parseInt(sessionStorage.getItem("year")) < 22
      ) {
        dateError = "⚠️ Invalid date";
      }
    }
    if (sessionStorage.getItem("name") === "") {
      nameError = "⚠️ Name cannot be empty";
    } else {
      if (!reg.test(sessionStorage.getItem("name"))) {
        nameError = "⚠️ Invalid name";
      }
    }

    if (numberError || cvvError || dateError || nameError) {
      setNameError(nameError);
      setNumberError(numberError);
      setCvvError(cvvError);
      setDateError(dateError);
      return false;
    }
    if (!numberError && !cvvError && !dateError && !nameError) {
      numberError = "";
      cvvError = "";
      dateError = "";
      nameError = "";
      setNameError(nameError);
      setNumberError(numberError);
      setCvvError(cvvError);
      setDateError(dateError);
      return true;
    }
  };

  return (
    <React.Fragment>
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "20px",
          marginTop: "20px",
          fontWeight: "600",
        }}
      >
        ← Back
      </Link>
      <Container className="payment">
        <div className="card-info">
          <h1>Payment</h1>
          <br />

          <Card id="debit-card">
            <Row>
              <Col>
                <div className="details">
                  <h3>Card Number</h3>
                  <label htmlFor="number">Enter the 16-digit card number</label>
                  <br></br>
                  <input
                    className="creditcard"
                    id="number"
                    maxLength={16}
                    value={sessionStorage.getItem("number")}
                    type="number"
                    onChange={(e) => {
                      setNumber(e.target.value);
                      sessionStorage.setItem("number", e.target.value);
                    }}
                  ></input>
                  <div className="form-errors">{numberError}</div>
                </div>
                <div className="details">
                  <Row>
                    <Col>
                      <h3>Valid Thru</h3>
                      <label>Enter the expiration date of the card</label>
                    </Col>
                    <Col>
                      <Row>
                        <Col md="5">
                          <input
                            className="creditcard"
                            id="month"
                            maxLength="2"
                            type="number"
                            value={sessionStorage.getItem("month")}
                            placeholder="MM"
                            onChange={(e) => {
                              setMonth(e.target.value);
                              sessionStorage.setItem("month", e.target.value);
                            }}
                          ></input>
                          <div className="form-errors">{dateError}</div>
                        </Col>
                        <Col md="2">
                          <h3>/</h3>
                        </Col>
                        <Col md="5">
                          <input
                            className="creditcard"
                            type="number"
                            id="year"
                            value={sessionStorage.getItem("year")}
                            maxLength={2}
                            placeholder="YY"
                            onChange={(e) => {
                              setYear(e.target.value);
                              sessionStorage.setItem("year", e.target.value);
                            }}
                          ></input>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div className="details">
                  <h3>Cardholder Name</h3>
                  <label htmlFor="name">Enter cardholder's name</label>
                  <br></br>
                  <input
                    type="text"
                    className="creditcard"
                    value={sessionStorage.getItem("name")}
                    id="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      sessionStorage.setItem("name", e.target.value);
                    }}
                  ></input>
                  <div className="form-errors">{nameError}</div>
                </div>
                <div className="details">
                  <Row>
                    <Col>
                      <h3>CVV Number</h3>
                      <label>Enter the 3-digit card number</label>
                    </Col>
                    <Col>
                      <input
                        className="creditcard"
                        id="cvv"
                        type="number"
                        maxLength={3}
                        value={sessionStorage.getItem("cvv")}
                        onChange={(e) => {
                          setCvv(e.target.value);
                          sessionStorage.setItem("cvv", e.target.value);
                        }}
                      ></input>
                      <div className="form-errors">{cvvError}</div>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={4}>
                    <button
                      className="pay-btn"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Pay Now
                    </button>
                  </Col>
                  <Col md={8}>
                    {success === true ? (
                      <Alert
                        variant={"sucess"}
                        onChange={alertDisable}
                        className="alert-payment"
                      >
                        <Alert.Heading>✅ Success!</Alert.Heading>
                        Payment is processed successfully!
                      </Alert>
                    ) : null}
                  </Col>
                </Row>
              </Col>
              <Col md="1"></Col>
              <Col md="4">
                <Card id="card-example">
                  <Row>
                    <Col md="9">
                      <h4 style={{ marginBottom: "30px" }}>Bank</h4>
                    </Col>
                    <Col>
                      {number.charAt(0) === "4" ? (
                        <img src={visa} alt="visa-card" width="30px"></img>
                      ) : null}
                      {number.charAt(0) === "5" ? (
                        <img
                          src={mastercard}
                          alt="mastercard-card"
                          width="30px"
                        ></img>
                      ) : null}
                    </Col>
                  </Row>
                  {sessionStorage.getItem("number") !== "" ? (
                    <h5>{sessionStorage.getItem("number")}</h5>
                  ) : (
                    <h5>CARD NUMBER</h5>
                  )}
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <p>VALID THRU</p>
                    </Col>
                    <Col>
                      {sessionStorage.getItem("month") !== "" ||
                      sessionStorage.getItem("year") !== "" ? (
                        <h5>
                          {sessionStorage.getItem("month")}/
                          {sessionStorage.getItem("year")}
                        </h5>
                      ) : (
                        <h5>MM/YY</h5>
                      )}
                    </Col>
                  </Row>
                  {sessionStorage.getItem("name") !== "" ? (
                    <h5>{sessionStorage.getItem("name").toUpperCase()}</h5>
                  ) : (
                    <h5>CARDHOLDER NAME</h5>
                  )}
                </Card>
                <div style={{ height: "50px" }}></div>
                <Card
                  id="card-example"
                  style={{ paddingRight: "0px", paddingLeft: "0px" }}
                >
                  <div
                    style={{
                      background: "black",
                      height: "40px",
                      marginBottom: "20px",
                    }}
                  ></div>
                  <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
                    <Row style={{ textAlign: "left" }}>
                      <Col>
                        <div
                          style={{ background: "white", height: "30px" }}
                        ></div>
                      </Col>
                      <Col md="3">
                        {sessionStorage.getItem("cvv") !== "" ? (
                          <h5>{sessionStorage.getItem("cvv")}</h5>
                        ) : (
                          <h5>CVV</h5>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Payment;
