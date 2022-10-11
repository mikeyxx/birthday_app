import React from "react";
import { useContext } from "react";
import { AuthApi } from "../context/AuthContext";

function Logout() {
  const { dispatch } = useContext(AuthApi);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
