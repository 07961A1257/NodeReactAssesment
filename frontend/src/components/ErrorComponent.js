import React from "react";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div className="container">
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default ErrorComponent;
