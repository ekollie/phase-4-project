import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

function LoginForm() {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    // position: yup.string().required("Must enter a position"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      // position: "",
    },
    validationSchema: formSchema,
    onSubmit: () => {
      fetch("/users")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          data.forEach((currentUser) => {
            if (currentUser.username === formik.values.username) {
              navigate(`/main`, {
                state: { currentUser },
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p style={{ color: "red" }}> {formik.errors.username}</p>
        {/* <input
          id="position"
          name="position"
          onChange={formik.handleChange}
          value={formik.values.position}
        />
        <p style={{ color: "red" }}> {formik.errors.position}</p> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
