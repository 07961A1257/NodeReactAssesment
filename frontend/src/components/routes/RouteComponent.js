import { Routes, Route } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import Login from "../Login/Login";
import Profile from "./../Profile/Profile";
import UserDetails from "./../UserDetails/UserDetails";
import PrivateRoute from "./PrivateRoute";

const RouteComponent = () => {
  debugger;
  const IS_ADMIN = sessionStorage.getItem("USER_ROLE") === "ADMIN";

  return (
    <Routes>
      <Route index path="/" element={<Login />}></Route>

      <Route
        index
        path="/Profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {IS_ADMIN ? (
        <Route
          index
          path="/UserDetails"
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />
      ) : (
        <Route
          path="/*"
          element={
            <ErrorComponent errorMessage="You dont have permissions to view" />
          }
        />
      )}

      <Route
        path="/*"
        element={<ErrorComponent errorMessage="Please login!!" />}
      />
    </Routes>
  );
};

export default RouteComponent;
