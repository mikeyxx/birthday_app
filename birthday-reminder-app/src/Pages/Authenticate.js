import React, { useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

function Authenticate() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="login">
      <AppBar
        position="static"
        style={{
          backgroundColor: "transparent",
          color: "white",
          boxShadow: "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          style={{ borderRadius: 10 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </AppBar>
      {value === 0 && <Login />}
      {value === 1 && <SignUp />}
    </div>
  );
}

export default Authenticate;
