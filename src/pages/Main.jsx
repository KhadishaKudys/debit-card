import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/success.css";
import { useSelector } from "react-redux";

const Main = () => {
  const payments = useSelector((state) => state.payments);
  console.log(payments);
  return (
    <div className="success">
      <Container>
        <h1>Main page</h1>
        <Link to="/payment">
          <button className="btn-1">Open payment page ⟿</button>
        </Link>
        <h3 style={{ marginBottom: "50px", marginTop: "50px" }}>
          Payment information
        </h3>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Card number</th>
              <th>Month</th>
              <th>Year</th>
              <th>Cardholder name</th>
              <th>CVV</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((data, index) => (
              <tr>
                <td>{data.id}</td>
                <td>{data.number}</td>
                <td>{data.month}</td>
                <td>{data.year}</td>
                <td>{data.name}</td>
                <td>{data.cvv}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Main;
