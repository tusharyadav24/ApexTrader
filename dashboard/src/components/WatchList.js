import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { useLiveMarket } from "./LiveMarketContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { stocks, isLive } = useLiveMarket();

  const watchlistStocks = stocks.filter((s) => s.inWatchlist);

  const data = {
    labels: watchlistStocks.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlistStocks.map((stock) => stock.price),
        backgroundColor: [
          "rgba(245, 104, 52, 0.55)",
          "rgba(65, 132, 243, 0.55)",
          "rgba(34, 197, 94, 0.55)",
          "rgba(255, 206, 86, 0.55)",
          "rgba(153, 102, 255, 0.55)",
          "rgba(255, 99, 132, 0.55)",
        ],
        borderColor: [
          "rgba(245, 104, 52, 1)",
          "rgba(65, 132, 243, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const filteredList = watchlistStocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watchlist-container fade-in-up">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: INFY, RELIANCE, TCS"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">
          <span className={`live-dot ${isLive ? "" : "paused"}`} />
          {watchlistStocks.length} / 50
        </span>
      </div>

      <ul className="list">
        {filteredList.map((stock) => {
          return <WatchListItem stock={stock} key={stock.name} />;
        })}
      </ul>

      <div style={{ padding: "12px 18px" }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  const flashClass =
    stock.tickDir === "up"
      ? "tick-flash-up"
      : stock.tickDir === "down"
      ? "tick-flash-down"
      : "";

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={flashClass}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent ${stock.isDown ? "down" : "up"}`}>
            {stock.percent}
          </span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price" style={{ fontWeight: 600 }}>
            {stock.price.toFixed(2)}
          </span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name} price={stock.price} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY", price);
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL", price);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>
        <Tooltip
          title="Live Chart"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <Link to="/live">
            <button className="action">
              <BarChartOutlined className="icon" />
            </button>
          </Link>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
