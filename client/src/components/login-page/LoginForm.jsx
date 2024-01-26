import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import '../../loginpage.css'

function LoginForm() {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter an email"),
    username: yup.string().required("Must enter a username"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
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
            if (
              currentUser.username === formik.values.username &&
              currentUser.email === formik.values.email
            ) {
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
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            id="username"
            name="username"
            placeholder="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && <p className="error">{formik.errors.username}</p>}
        </div>
        <div className="input-group">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p> {formik.errors.position}</p>
          <div className= "button-container">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;


