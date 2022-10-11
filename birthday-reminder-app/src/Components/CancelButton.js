import React from "react";
import { Link } from "react-router-dom";

function CancelButton() {
  return (
    <div className="cancel">
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
}

export default CancelButton;
