import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Result = () => {
    const [loading, setLoading] = useState(false);
    const { message, transactionData } = useLocation().state || {};
    const navigate = useNavigate();
  
    const handleResponse = (isMe) => {
      setLoading(true);
      // Simulate a loading delay before redirecting
      setTimeout(() => {
        navigate("/transaction-result", {
          state: {
            message: isMe
              ? "Transaction Proceeded Successfully!"
              : "Possible Fraudulent Transaction!",
            isFraudulent: !isMe,
            transactionData,
          },
        });
      }, 5000); // Add a 1-second delay for loading
    };
  
    return (
      <div className="result-page">
        <h2>{message}</h2>
        <p style={{color:"white",fontSize:"16px",fontWeight:"bold"}}>Is this transaction yours?</p>
        <div style={{ marginBottom: 20 }}>
          <button
            className="btn"
            onClick={() => handleResponse(true)}
            disabled={loading}
          >
            Yes, it's me
          </button>
          <button
            className="btn"
            onClick={() => handleResponse(false)}
            disabled={loading}
          >
            No, it's not me
          </button>
        </div>
  
        {loading && <div className="spinner"></div>} {/* Show the spinner */}
      </div>
    )
};

export default Result;
