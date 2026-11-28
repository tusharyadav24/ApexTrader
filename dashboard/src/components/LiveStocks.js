import React, { useState, useContext, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  PlayArrow,
  Pause,
  TrendingUp,
  TrendingDown,
  Speed,
} from "@mui/icons-material";
import { useLiveMarket } from "./LiveMarketContext";
import GeneralContext from "./GeneralContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const MiniSparkline = ({ data, isDown, width = 100, height = 32 }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const strokeColor = isDown ? "#ef4444" : "#22c55e";

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const LiveStocks = () => {
  const {
    stocks,
    indices,
    isLive,
    setIsLive,
    tickSpeed,
    setTickSpeed,
    lastUpdated,
  } = useLiveMarket();
  const generalContext = useContext(GeneralContext);

  const [filterTab, setFilterTab] = useState("ALL");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE");

  const sectors = useMemo(() => {
    const set = new Set(stocks.map((s) => s.sector));
    return ["ALL", ...Array.from(set)];
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    let list = [...stocks];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
      );
    }

    if (sectorFilter !== "ALL") {
      list = list.filter((s) => s.sector === sectorFilter);
    }

    if (filterTab === "GAINERS") {
      list = list
        .filter((s) => !s.isDown)
        .sort((a, b) => b.percentValue - a.percentValue);
    } else if (filterTab === "LOSERS") {
      list = list
        .filter((s) => s.isDown)
        .sort((a, b) => a.percentValue - b.percentValue);
    }

    return list;
  }, [stocks, search, sectorFilter, filterTab]);

  const selectedStock = useMemo(
    () => stocks.find((s) => s.name === selectedSymbol) || stocks[0],
    [stocks, selectedSymbol]
  );

  const chartData = useMemo(() => {
    if (!selectedStock) return null;
    const isDown = selectedStock.isDown;
    const lineColor = isDown ? "#ef4444" : "#22c55e";
    const fillColor = isDown
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(34, 197, 94, 0.12)";

    return {
      labels: selectedStock.history.map((_, i) => `T-${selectedStock.history.length - 1 - i}`),
      datasets: [
        {
          label: `${selectedStock.name} (₹)`,
          data: selectedStock.history,
          borderColor: lineColor,
          backgroundColor: fillColor,
          fill: true,
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 5,
          borderWidth: 2.5,
        },
      ],
    };
  }, [selectedStock]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 250 },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { size: 10 }, maxTicksLimit: 6 },
      },
      y: {
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  const handleQuickTrade = (e, stock, mode) => {
    e.stopPropagation();
    generalContext.openBuyWindow(stock.name, mode, stock.price);
  };

  return (
    <div className="live-stocks-page fade-in-up">
      <div className="live-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3 className="title" style={{ margin: 0 }}>
              Live Market
            </h3>
            <span className="live-badge">
              <span className={`live-dot ${isLive ? "" : "paused"}`} />
              {isLive ? "LIVE FEED" : "PAUSED"}
            </span>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "4px 0 0 0" }}>
            Real-time NSE stock quotes • Last tick:{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "--:--:--"}
          </p>
        </div>

        <div className="live-controls">
          <input
            type="text"
            className="live-search-input"
            placeholder="Search symbol or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="live-tab-btn"
            onClick={() => setTickSpeed((prev) => (prev === 1800 ? 750 : 1800))}
            title="Toggle tick speed"
            style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
          >
            <Speed style={{ fontSize: 16 }} />
            {tickSpeed === 750 ? "Fast (0.75s)" : "Normal (1.8s)"}
          </button>
          <button
            className="btn btn-apex"
            onClick={() => setIsLive((prev) => !prev)}
            style={{
              padding: "7px 14px",
              fontSize: "0.8rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {isLive ? (
              <>
                <Pause style={{ fontSize: 16 }} /> Pause
              </>
            ) : (
              <>
                <PlayArrow style={{ fontSize: 16 }} /> Resume
              </>
            )}
          </button>
        </div>
      </div>

      <div className="indices-grid">
        {indices.map((idx, i) => (
          <div
            key={idx.id}
            className={`glass-card index-card scroll-reveal scroll-reveal-delay-${(i % 4) + 1} ${
              idx.tickDir === "up"
                ? "tick-flash-up"
                : idx.tickDir === "down"
                ? "tick-flash-down"
                : ""
            }`}
          >
            <div className="index-card-top">
              <span className="index-card-name">{idx.name}</span>
              <MiniSparkline data={idx.history} isDown={idx.isDown} width={72} height={24} />
            </div>
            <div className="index-card-price">
              {idx.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div
              className={`index-card-change ${idx.isDown ? "down" : "up"}`}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {idx.isDown ? (
                <TrendingDown style={{ fontSize: 15 }} />
              ) : (
                <TrendingUp style={{ fontSize: 15 }} />
              )}
              {idx.change >= 0 ? "+" : ""}
              {idx.change.toFixed(2)} ({idx.percent})
            </div>
          </div>
        ))}
      </div>

      {selectedStock && chartData && (
        <div className="glass-card live-chart-panel fade-in-up">
          <div className="live-chart-header">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#1a1a2e" }}>
                  {selectedStock.name}
                </h4>
                <span className="stock-sector">{selectedStock.sector}</span>
                <span
                  className={`stock-change-pill ${
                    selectedStock.isDown ? "down" : "up"
                  }`}
                >
                  {selectedStock.percent}
                </span>
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                LTP: <strong>₹{selectedStock.price.toFixed(2)}</strong> • High: ₹
                {selectedStock.high.toFixed(2)} • Low: ₹{selectedStock.low.toFixed(2)} • Vol:{" "}
                {selectedStock.volume}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn btn-blue"
                style={{ padding: "7px 16px", fontSize: "0.82rem" }}
                onClick={(e) => handleQuickTrade(e, selectedStock, "BUY")}
              >
                Buy {selectedStock.name}
              </button>
              <button
                className="btn btn-apex"
                style={{ padding: "7px 16px", fontSize: "0.82rem" }}
                onClick={(e) => handleQuickTrade(e, selectedStock, "SELL")}
              >
                Sell {selectedStock.name}
              </button>
            </div>
          </div>
          <div style={{ height: "190px", width: "100%" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="live-tabs">
          {[
            { id: "ALL", label: `All (${stocks.length})` },
            { id: "GAINERS", label: "Top Gainers" },
            { id: "LOSERS", label: "Top Losers" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`live-tab-btn ${filterTab === tab.id ? "active" : ""}`}
              onClick={() => setFilterTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="live-tabs">
          {sectors.map((sec) => (
            <button
              key={sec}
              className={`live-tab-btn ${sectorFilter === sec ? "active" : ""}`}
              onClick={() => setSectorFilter(sec)}
              style={{ fontSize: "0.74rem", padding: "5px 11px" }}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      <div className="live-stocks-grid">
        {filteredStocks.map((stock, idx) => {
          const range = stock.high - stock.low || 1;
          const posPct = Math.min(
            100,
            Math.max(0, ((stock.price - stock.low) / range) * 100)
          );
          const flashClass =
            stock.tickDir === "up"
              ? "tick-flash-up"
              : stock.tickDir === "down"
              ? "tick-flash-down"
              : "";

          return (
            <div
              key={stock.name}
              onClick={() => setSelectedSymbol(stock.name)}
              className={`glass-card stock-card scale-in ${
                selectedStock?.name === stock.name ? "selected-stock" : ""
              } ${flashClass}`}
              style={{ animationDelay: `${Math.min(idx * 0.03, 0.3)}s` }}
            >
              <div className="stock-card-header">
                <div>
                  <div className="stock-symbol">{stock.name}</div>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    Vol: {stock.volume}
                  </span>
                </div>
                <span className="stock-sector">{stock.sector}</span>
              </div>

              <div className="stock-price-row">
                <div>
                  <div className="stock-ltp">₹{stock.price.toFixed(2)}</div>
                  <div
                    className={stock.isDown ? "down" : "up"}
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                  <span className={`stock-change-pill ${stock.isDown ? "down" : "up"}`}>
                    {stock.percent}
                  </span>
                  <MiniSparkline data={stock.history} isDown={stock.isDown} width={86} height={26} />
                </div>
              </div>

              <div>
                <div className="stock-meta">
                  <span>L: ₹{stock.low.toFixed(2)}</span>
                  <span>H: ₹{stock.high.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: "#e2e8f0",
                    borderRadius: "4px",
                    marginTop: "4px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${posPct}%`,
                      height: "100%",
                      background: stock.isDown
                        ? "linear-gradient(90deg, #f87171, #ef4444)"
                        : "linear-gradient(90deg, #4ade80, #16a34a)",
                      borderRadius: "4px",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>

              <div className="stock-actions">
                <button
                  className="buy"
                  onClick={(e) => handleQuickTrade(e, stock, "BUY")}
                >
                  Buy
                </button>
                <button
                  className="sell"
                  onClick={(e) => handleQuickTrade(e, stock, "SELL")}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveStocks;
