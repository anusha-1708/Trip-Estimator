import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCurrentUserAsync } from "./store/auth.store";
import { ToastContainer } from "react-toastify";
import Sidebar from "./component/Sidebar";
import Settings from "./pages/Setting/Settings";
import { Navigate } from "react-router";
import Modal from "@mui/material/Modal";
import StepperForm from "./formComponent/index";
import { IoMdClose } from "react-icons/io";
import MyTrips from "./pages/Trip/Trips";
import ShareTrips from "./pages/SharedTrip/ShareTrips";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  const handleOpen = (id = null) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <Sidebar />}

      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-slate-50 pl-64 md:pl-64">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<MyTrips isOpen={handleOpen} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shared-trips" element={<ShareTrips />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <div className="absolute bg-white p-4 top-1/2 left-1/2 shadow-xl rounded-lg -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-end">
            <IoMdClose
              className="h-5 w-auto cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <StepperForm selectedId={selectedId} onClose={handleClose} />
        </div>
      </Modal>

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
