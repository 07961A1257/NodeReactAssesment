import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "../../apis/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    await axios
      .post("/login", values)
      .then((res) => {
        const { id } = res.data[0] || 0;
        if (res.status === 200) {
          setError("");
          const role = res.data[0].role;
          sessionStorage.setItem("IS_LOGGED_IN", true);
          sessionStorage.setItem("USER_ID", id);
          sessionStorage.setItem("USER_ROLE", role);

          if (role && role.toLowerCase() === "employee") {
            navigate("/Profile");
            // navigate({
            //   pathname: "/Profile",
            //   search: createSearchParams({
            //     id: id,
            //   }).toString(),
            // });
          } else if (role && role.toLowerCase() === "admin") {
            navigate("/UserDetails");
          }
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        setError("Invalid Credentials");
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(5, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit} className="form-border">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && "error"}
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "#5933e4", color: "white", margin: 0 }}
            >
              Login
            </button>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
          </form>
        );
      }}
    </Formik>
  );
};

export default Login;
