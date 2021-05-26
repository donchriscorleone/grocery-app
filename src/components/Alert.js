import React, { useEffect } from "react";
import { MdError, MdCheckCircle } from "react-icons/md";

const Alert = ({ message, type, removeAlert }) => {
  const renderIcon = () => {
    return type === "danger" ? <MdError /> : <MdCheckCircle />;
  };

  useEffect(() => {
    const reset = setTimeout(() => {
      removeAlert();
    }, 2200);
    return () => clearTimeout(reset);
  });
  return (
    <div className={`${type}`}>
      <p>
        {renderIcon()}
        {message}
      </p>
    </div>
  );
};

export default Alert;
