import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5" style={{ fontSize: "6rem", color: "#ddd" }}>
          404
        </h1>
        <h2 className="mt-3">Page Not Found</h2>
        <p className="text-muted">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="btn btn-primary px-4 py-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
