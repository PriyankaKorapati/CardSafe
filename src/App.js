import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Result from "./components/Result";
import TransactionResult from "./components/TransactionResult";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/transaction-result" element={<TransactionResult />} />
      </Routes>
    </Router>
  );
};

export default App;
