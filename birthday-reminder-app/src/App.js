import Board from "./Pages/Board";
import BirthdayInput from "./Pages/BirthdayInput";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthApi } from "./context/AuthContext";
import Authenticate from "./Pages/Authenticate";
import Alert from "./Components/Alert";

function App() {
  const { currentUser } = useContext(AuthApi);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <h1>birthday notification</h1>
        <Routes>
          <Route exact path="/login" element={<Authenticate />} />
          <Route
            exact
            path="/"
            element={
              <RequireAuth>
                <Board />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/add"
            element={
              <RequireAuth>
                <BirthdayInput />
              </RequireAuth>
            }
          />
        </Routes>
        <Alert />
      </Router>
    </div>
  );
}

export default App;
