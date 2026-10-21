import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders.");
        setLoading(false);
      });
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deleteOrder/${id}`, {
        withCredentials: true,
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Failed to delete order.");
    }
  };

  if (loading) return <p className="loading-text">Loading orders...</p>;
  if (error) return <p className="error-text">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <a href="/" className="btn">
            Get started
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>
                  <p
                    style={{
                      background:
                        order.mode === "BUY"
                          ? "rgba(65,132,243,0.15)"
                          : "rgba(255,87,34,0.15)",
                      color: order.mode === "BUY" ? "#4184f3" : "#ff5722",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      display: "inline-block",
                      fontWeight: 500,
                    }}
                  >
                    {order.mode}
                  </p>
                </td>
                <td>{order.qty}</td>
                <td>{order.price > 0 ? order.price.toFixed(2) : "Market"}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    style={{
                      background: "transparent",
                      border: "1px solid #ddd",
                      borderRadius: "2px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      color: "#888",
                      fontSize: "0.75rem",
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
