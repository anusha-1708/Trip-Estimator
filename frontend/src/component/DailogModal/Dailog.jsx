import React from "react";
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
const DailogBox = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <div className="p-4 relative">
        <IoMdClose
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
          onClick={onClose}
        />
      </div>
      {children}
    </Dialog>
  );
};

export default DailogBox;
