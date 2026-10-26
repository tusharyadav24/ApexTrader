import React from "react";
import { Route, Routes } from "react-router-dom";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

// FIX #2: GeneralContextProvider now wraps the ENTIRE dashboard layout,
// ensuring WatchList (which uses openBuyWindow) and BuyActionWindow
// (which is rendered inside the provider) share the same context scope.
const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />
        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
