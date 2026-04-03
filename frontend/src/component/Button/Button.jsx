import React from "react";

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`bg-blue-600 text-white px-2 py-2 rounded-full hover:bg-blue-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
