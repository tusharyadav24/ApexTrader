import React, { createContext, useContext, useEffect, useState } from "react";
import { watchlist as initialWatchlist } from "../data/data";

const EXTRA_STOCKS = [
  { name: "RELIANCE", sector: "Energy", basePrice: 2112.4, prevClose: 2082.4, volume: "8.42M" },
  { name: "TCS", sector: "IT", basePrice: 3194.8, prevClose: 3202.8, volume: "3.15M" },
  { name: "HDFCBANK", sector: "Banking", basePrice: 1522.35, prevClose: 1520.65, volume: "11.2M" },
  { name: "INFY", sector: "IT", basePrice: 1555.45, prevClose: 1580.75, volume: "6.85M" },
  { name: "ICICIBANK", sector: "Banking", basePrice: 1124.6, prevClose: 1110.2, volume: "9.70M" },
  { name: "SBIN", sector: "Banking", basePrice: 785.4, prevClose: 778.1, volume: "14.3M" },
  { name: "BHARTIARTL", sector: "Telecom", basePrice: 1298.5, prevClose: 1260.8, volume: "5.40M" },
  { name: "WIPRO", sector: "IT", basePrice: 577.75, prevClose: 575.9, volume: "4.82M" },
  { name: "TATAMOTORS", sector: "Auto", basePrice: 982.3, prevClose: 969.5, volume: "12.6M" },
  { name: "KPITTECH", sector: "IT", basePrice: 266.45, prevClose: 257.35, volume: "2.95M" },
  { name: "M&M", sector: "Auto", basePrice: 779.8, prevClose: 779.9, volume: "3.10M" },
  { name: "ITC", sector: "FMCG", basePrice: 438.9, prevClose: 435.4, volume: "10.5M" },
  { name: "ONGC", sector: "Energy", basePrice: 116.8, prevClose: 116.9, volume: "7.80M" },
  { name: "HUL", sector: "FMCG", basePrice: 512.4, prevClose: 507.1, volume: "2.15M" },
  { name: "QUICKHEAL", sector: "Tech", basePrice: 308.55, prevClose: 309.0, volume: "0.85M" },
];

const INITIAL_INDICES = [
  { id: "NIFTY", name: "NIFTY 50", price: 22519.4, prevClose: 22367.2 },
  { id: "SENSEX", name: "SENSEX", price: 73961.3, prevClose: 73527.5 },
  { id: "BANKNIFTY", name: "BANK NIFTY", price: 47842.15, prevClose: 47590.0 },
  { id: "VIX", name: "INDIA VIX", price: 13.42, prevClose: 13.78 },
];

const buildInitialHistory = (price) => {
  const arr = [];
  let p = price * 0.996;
  for (let i = 0; i < 19; i++) {
    p = p * (1 + (Math.random() - 0.48) * 0.004);
    arr.push(Number(p.toFixed(2)));
  }
  arr.push(price);
  return arr;
};

const createInitialStocks = () => {
  const map = new Map();

  initialWatchlist.forEach((item) => {
    const extra = EXTRA_STOCKS.find((s) => s.name === item.name);
    const price = item.price;
    const pctNum = parseFloat(item.percent) || 0;
    const prevClose = extra
      ? extra.prevClose
      : Number((price / (1 + pctNum / 100)).toFixed(2));
    map.set(item.name, {
      name: item.name,
      sector: extra?.sector || "Equities",
      price,
      prevClose,
      high: Number((price * 1.012).toFixed(2)),
      low: Number((price * 0.988).toFixed(2)),
      volume: extra?.volume || "3.20M",
      history: buildInitialHistory(price),
      tickDir: "flat",
      inWatchlist: true,
    });
  });

  EXTRA_STOCKS.forEach((s) => {
    if (!map.has(s.name)) {
      map.set(s.name, {
        name: s.name,
        sector: s.sector,
        price: s.basePrice,
        prevClose: s.prevClose,
        high: Number((s.basePrice * 1.014).toFixed(2)),
        low: Number((s.basePrice * 0.986).toFixed(2)),
        volume: s.volume,
        history: buildInitialHistory(s.basePrice),
        tickDir: "flat",
        inWatchlist: false,
      });
    }
  });

  return Array.from(map.values()).map(enrichStock);
};

const enrichStock = (stock) => {
  const change = stock.price - stock.prevClose;
  const pct = stock.prevClose > 0 ? (change / stock.prevClose) * 100 : 0;
  return {
    ...stock,
    change: Number(change.toFixed(2)),
    percentValue: Number(pct.toFixed(2)),
    percent: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
    isDown: pct < 0,
  };
};

const createInitialIndices = () =>
  INITIAL_INDICES.map((idx) => {
    const change = idx.price - idx.prevClose;
    const pct = (change / idx.prevClose) * 100;
    return {
      ...idx,
      change: Number(change.toFixed(2)),
      percent: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
      isDown: pct < 0,
      tickDir: "flat",
      history: buildInitialHistory(idx.price),
    };
  });

const LiveMarketContext = createContext({
  stocks: [],
  indices: [],
  isLive: true,
  setIsLive: () => {},
  tickSpeed: 1800,
  setTickSpeed: () => {},
  lastUpdated: null,
});

export const LiveMarketProvider = ({ children }) => {
  const [stocks, setStocks] = useState(createInitialStocks);
  const [indices, setIndices] = useState(createInitialIndices);
  const [isLive, setIsLive] = useState(true);
  const [tickSpeed, setTickSpeed] = useState(1800);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          if (Math.random() > 0.6) {
            return { ...stock, tickDir: "flat" };
          }
          const deltaPct = (Math.random() - 0.495) * 0.008;
          const nextPrice = Math.max(
            5,
            Number((stock.price * (1 + deltaPct)).toFixed(2))
          );
          const tickDir =
            nextPrice > stock.price
              ? "up"
              : nextPrice < stock.price
              ? "down"
              : "flat";
          const nextHistory = [...stock.history.slice(-19), nextPrice];
          return enrichStock({
            ...stock,
            price: nextPrice,
            high: Math.max(stock.high, nextPrice),
            low: Math.min(stock.low, nextPrice),
            history: nextHistory,
            tickDir,
          });
        })
      );

      setIndices((prev) =>
        prev.map((idx) => {
          const deltaPct = (Math.random() - 0.495) * 0.0018;
          const nextPrice = Number((idx.price * (1 + deltaPct)).toFixed(2));
          const change = nextPrice - idx.prevClose;
          const pct = (change / idx.prevClose) * 100;
          const tickDir =
            nextPrice > idx.price
              ? "up"
              : nextPrice < idx.price
              ? "down"
              : "flat";
          return {
            ...idx,
            price: nextPrice,
            change: Number(change.toFixed(2)),
            percent: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
            isDown: pct < 0,
            tickDir,
            history: [...idx.history.slice(-19), nextPrice],
          };
        })
      );

      setLastUpdated(new Date());
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [isLive, tickSpeed]);

  return (
    <LiveMarketContext.Provider
      value={{
        stocks,
        indices,
        isLive,
        setIsLive,
        tickSpeed,
        setTickSpeed,
        lastUpdated,
      }}
    >
      {children}
    </LiveMarketContext.Provider>
  );
};

export const useLiveMarket = () => useContext(LiveMarketContext);

export default LiveMarketContext;
