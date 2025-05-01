import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "./components/TransactionForm";

const Home = () => {
  const [transactionData, setTransactionData] = useState({
    amount: "",
    cardHolderId: "",
    cardHolderName: "",
    cardNumber: "",
    merchantCategoryCode: "",
    transactionType: "",
    deviceType: "",
    emailDomain: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const analyzeTransaction = () => {
    if (!isAuthenticated) {
      alert("❌ Please authenticate before analyzing the transaction.");
      return;
    }

    const {
      amount,
      cardHolderId,
      merchantCategoryCode,
      transactionType,
      deviceType,
    } = transactionData;

    if (!transactionType || !deviceType) {
      alert("Please select Transaction Type and Device Type.");
      return;
    }

    let isFraud = false;
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amountValue > 500000) isFraud = true;

    const commonMerchantCodes = ["5411", "5812", "4814"];
    if (!commonMerchantCodes.includes(merchantCategoryCode)) isFraud = true;

    if (transactionType.toLowerCase() === "international") isFraud = true;

    const validIds = Array.from({ length: 20 }, (_, i) => `CH${String(i + 1).padStart(3, "0")}`);
    if (!validIds.includes(cardHolderId)) isFraud = true;

    if (isFraud) {
      navigate("/result", {
        state: {
          message: "Possible Fraudulent Transaction!",
          isFraudulent: true,
          needsConfirmation: true,
          transactionData,
        },
      });
    } else {
      navigate("/transaction-result", {
        state: {
          message: "Transaction Proceeded Successfully!",
          isFraudulent: false,
        },
      });
    }
  };

  return (
    <div className="background-container">
      <h2 style={{ textAlign: "center" }}>Transaction Analyzer</h2>
      <TransactionForm
        transactionData={transactionData}
        onChange={handleInputChange}
        onAuthChange={setIsAuthenticated}
      />
      <button className="btn" onClick={analyzeTransaction}>
        Analyze Transaction
      </button>
    </div>
  );
};

export default Home;
