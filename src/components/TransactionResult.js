import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css"; // Ensure styling for result page

const TransactionResult = () => {
  const location = useLocation();
  const { message, isFraudulent } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="result-container">
      <h2>Transaction Analysis Result</h2>
      <p className={isFraudulent ? "error" : "success"} style={{fontWeight:'bold',fontSize:"15px"}}>{message}</p>
      <button className="btn" onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default TransactionResult;
