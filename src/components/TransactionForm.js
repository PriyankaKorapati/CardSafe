import React, { useState } from "react";

const VALID_CARDS = [
  { cardNumber: "1234567812345678", cardHolderName: "priya" },
  { cardNumber: "1111222233334444", cardHolderName: "divya" },
  { cardNumber: "5555666677778888", cardHolderName: "renu" },
  { cardNumber: "9999000011112222", cardHolderName: "ram" },
  { cardNumber: "3333444455556666", cardHolderName: "sheela" },
  { cardNumber: "4444555566667777", cardHolderName: "sireesha" },
  { cardNumber: "2222333344445555", cardHolderName: "vijaya" },
  { cardNumber: "8888999900001111", cardHolderName: "vennela" },
  { cardNumber: "6666777788889999", cardHolderName: "raju" },
  { cardNumber: "7777888899990000", cardHolderName: "sravan" },
  { cardNumber: "1010101010101010", cardHolderName: "sanjana" },
  { cardNumber: "2020202020202020", cardHolderName: "ramana" },
  { cardNumber: "3030303030303030", cardHolderName: "gouthami" },
  { cardNumber: "4040404040404040", cardHolderName: "seetha" },
  { cardNumber: "5050505050505050", cardHolderName: "akila" },
  { cardNumber: "6060606060606060", cardHolderName: "hema" },
  { cardNumber: "7070707070707070", cardHolderName: "darshini" },
  { cardNumber: "8080808080808080", cardHolderName: "lakshmi kanth" },
  { cardNumber: "9090909090909090", cardHolderName: "hari" },
  { cardNumber: "1122334455667788", cardHolderName: "srinu" },
  { cardNumber: "2211221122112211", cardHolderName: "gopal" },
  { cardNumber: "9988776655443322", cardHolderName: "akhila" },
  { cardNumber: "1234432112344321", cardHolderName: "swapna" },
  { cardNumber: "5678567856785678", cardHolderName: "madhav" },
  { cardNumber: "8765432187654321", cardHolderName: "siri" },
  { cardNumber: "1011121314151617", cardHolderName: "sundari" },
  { cardNumber: "1928374655647382", cardHolderName: "naveen" },
  { cardNumber: "2143658709214387", cardHolderName: "aditya" },
  { cardNumber: "3141592653589793", cardHolderName: "krishna" },
  { cardNumber: "9876543210987654", cardHolderName: "ramana" },
  { cardNumber: "1212121212121212", cardHolderName: "seetha" },
  { cardNumber: "3434343434343434", cardHolderName: "vijaya" },
  { cardNumber: "5656565656565656", cardHolderName: "ravi" },
  { cardNumber: "7878787878787878", cardHolderName: "vijju" },
  { cardNumber: "9090909090909091", cardHolderName: "adi" },
  { cardNumber: "1122112211221122", cardHolderName: "lakshmi" },
  { cardNumber: "3344334433443344", cardHolderName: "swapna" },
  { cardNumber: "5566556655665566", cardHolderName: "yashu" },
  { cardNumber: "7788778877887788", cardHolderName: "reddy" },
  { cardNumber: "9900990099009900", cardHolderName: "gouthami" },
];

const TransactionForm = ({ transactionData, onChange, onAuthChange }) => {
  const [authStatus, setAuthStatus] = useState("");

  const handleAuthentication = () => {
    const { cardNumber, cardHolderName } = transactionData;

    if (!/^\d{16}$/.test(cardNumber)) {
      setAuthStatus("❌ Card number must be exactly 16 digits.");
      onAuthChange(false);
      return;
    }

    const isValid = VALID_CARDS.some(
      (pair) =>
        pair.cardNumber === cardNumber &&
        pair.cardHolderName.toLowerCase() === cardHolderName.toLowerCase()
    );

    const result = isValid ? "✅ Authentication Passed" : "❌ Authentication Failed";
    setAuthStatus(result);
    onAuthChange(isValid);
  };

  const fields = [
    { name: "amount", placeholder: "Amount (e.g., 100.00)" },
    { name: "cardNumber", placeholder: "Card Number (16 digits)" },
    { name: "cardHolderName", placeholder: "Cardholder Name" },
    { name: "merchantCategoryCode", placeholder: "Merchant Code (e.g., 5411)" },
    {
      name: "transactionType",
      type: "dropdown",
      options: ["National", "International"],
    },
    {
      name: "deviceType",
      type: "dropdown",
      options: ["Mobile", "Desktop", "Tablet"],
    },
    { name: "emailDomain", placeholder: "Email Domain (e.g., gmail.com)" },
  
  ];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2>Fraud Detection Transaction Form</h2>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            {field.name}:
          </label>
          {field.type === "dropdown" ? (
            <select
              name={field.name}
              value={transactionData[field.name] || ""}
              onChange={onChange}
              style={{ width: "105%", padding: "8px",borderRadius:"5px", backgroundColor:"#c9c9c9",border:"3px solid black" }}
              required
            >
              <option value="">--Select--</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={transactionData[field.name] || ""}
              onChange={onChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          )}
        </div>
      ))}

      <button
        onClick={handleAuthentication}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        User Authentication
      </button>

      {authStatus && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{authStatus}</p>
      )}
    </div>
  );
};

export default TransactionForm;
