import { useEffect } from "react";
import { useState } from "react";
import { useReducer, createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIALSTATE = {
  currentUser: JSON.parse(localStorage.getItem("userInfo")),
};

export const AuthApi = createContext(INITIALSTATE);

function AuthContext({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIALSTATE);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthApi.Provider
      value={{ currentUser: state.currentUser, alert, setAlert, dispatch }}
    >
      {children}
    </AuthApi.Provider>
  );
}

export default AuthContext;
