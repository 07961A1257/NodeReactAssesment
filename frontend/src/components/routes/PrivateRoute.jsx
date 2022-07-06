import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const IS_LOGGED_IN = sessionStorage.getItem("IS_LOGGED_IN") || false;
  return IS_LOGGED_IN ? children : <Navigate to="/" />;
};

export default PrivateRoute;
