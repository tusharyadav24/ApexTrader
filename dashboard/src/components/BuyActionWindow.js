import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [mode, setMode] = useState("BUY");
  const [loading, setLoading] = useState(false);

  const generalContext = useContext(GeneralContext);

  const handleOrderClick = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode,
        },
        { withCredentials: true }
      );
      generalContext.closeBuyWindow();
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="tab">
        <button
          onClick={() => setMode("BUY")}
          style={{
            color: mode === "BUY" ? "#4184f3" : "#888",
            borderBottom: mode === "BUY" ? "2px solid #4184f3" : "none",
          }}
        >
          Buy
        </button>
        <button
          onClick={() => setMode("SELL")}
          style={{
            color: mode === "SELL" ? "#ff5722" : "#888",
            borderBottom: mode === "SELL" ? "2px solid #ff5722" : "none",
          }}
        >
          Sell
        </button>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          {uid} · {mode}
        </span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleOrderClick}
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer", border: "none" }}
          >
            {loading ? "Placing..." : mode}
          </button>
          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
            style={{ cursor: "pointer", border: "none" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
