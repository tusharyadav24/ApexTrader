import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load holdings.");
        setLoading(false);
      });
  }, []);

  const labels = allHoldings.map((s) => s.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(65, 132, 243, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const totalCurrent = allHoldings.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPnL = totalCurrent - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  if (loading) return <p className="loading-text">Loading holdings...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
