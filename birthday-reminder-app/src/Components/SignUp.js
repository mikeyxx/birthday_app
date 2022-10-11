import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthApi } from "../context/AuthContext";
import { auth } from "../firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useContext(AuthApi);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up Successful! Welcome ${result.user.email}. Please log in`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div className="inp">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            // placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inp">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            // placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inp">
          <label htmlFor="Cpassword">Confirm Password</label>
          <input
            id="Cpassword"
            name="password"
            type="password"
            // placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
