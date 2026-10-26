import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/allOrders")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        api
          .get("/orders")
          .then((res) => {
            setOrders(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load orders.");
            setLoading(false);
          });
      });
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await api.delete(`/deleteOrder/${id}`).catch(() => api.delete(`/orders/${id}`));
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
          <Link to="/" className="btn">
            Get started
          </Link>
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
            {orders.map((order) => {
              const priceNum = Number(order.price) || 0;
              return (
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
                  <td>{priceNum > 0 ? priceNum.toFixed(2) : "Market"}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;