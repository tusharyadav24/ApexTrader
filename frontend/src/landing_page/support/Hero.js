import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <Link to="/support">Track Tickets</Link>
      </div>
      <div className="row p-5 m-3">
        <div className="col-md-6 p-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            className="form-control mt-3 mb-3"
            placeholder="Eg. how do I activate F&O"
          />
          <br />
          <Link to="/support" className="d-block mb-2">
            Track account opening
          </Link>
          <Link to="/support" className="d-block mb-2">
            Track segment activation
          </Link>
          <Link to="/support" className="d-block mb-2">
            Intraday margins
          </Link>
          <Link to="/support" className="d-block mb-2">
            Dashboard user manual
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li>
              <Link to="/support">
                Current Takeovers and Delisting - January 2024
              </Link>
            </li>
            <li>
              <Link to="/support">Latest Intraday leverages - MIS &amp; CO</Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
