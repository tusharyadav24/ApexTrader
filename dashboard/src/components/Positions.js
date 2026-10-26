import React, { useState, useEffect } from "react";
import api from "../api";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/allPositions")
      .then((res) => {
        setAllPositions(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        api
          .get("/positions")
          .then((res) => {
            setAllPositions(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load positions.");
            setLoading(false);
          });
      });
  }, []);

  if (loading) return <p className="loading-text">Loading positions...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#aaa" }}>
                  No open positions
                </td>
              </tr>
            ) : (
              allPositions.map((stock, index) => {
                const qty = Number(stock.qty) || 0;
                const avg = Number(stock.avg) || 0;
                const price = Number(stock.price) || 0;
                const curValue = price * qty;
                const pnl = curValue - avg * qty;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product || "CNC"}</td>
                    <td>{stock.name}</td>
                    <td>{qty}</td>
                    <td>{avg.toFixed(2)}</td>
                    <td>{price.toFixed(2)}</td>
                    <td className={profClass}>{pnl.toFixed(2)}</td>
                    <td className={dayClass}>{stock.day || "0.00%"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;