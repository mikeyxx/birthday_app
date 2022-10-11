import React from "react";
import { Link } from "react-router-dom";

function Button() {
  return (
    <div className="addPerson">
      <Link to="/add">
        <button>Add Birthday</button>
      </Link>
    </div>
  );
}

export default Button;
