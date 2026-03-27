import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./Auth-pages/Login";
import Signup from "./Auth-pages/Signup";
import Trips from "./pages/Trips";
import ProtectedRoute from "./component/Protected-Routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUserAsync } from "./store/auth.store";
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<Trips />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
