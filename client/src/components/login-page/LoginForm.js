import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

function LoginForm() {
  const [refreshPage, setRefreshPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const url = useEffect(() => {
    console.log("Fetching users...");
    fetch("/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter a name"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: () => {
      fetch("/users")
        .then((res) => {
          if (res.ok) {
            setRefreshPage(!refreshPage);
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          console.log(data);
          setCurrentUser(() => data);
          console.log(currentUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div>
      <h1>Login form</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label htmlFor="password">Password</label>
        <br />

        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>email</th>
            <th>password</th>
          </tr>
          {currentUser === undefined ? (
            <p>Loading</p>
          ) : (
            currentUser.map((currentUser, i) => (
              <>
                <tr key={i}>
                  <td>{currentUser.email}</td>
                  <td>{currentUser.password}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoginForm;
