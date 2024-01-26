import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewComplimentForm({ user, currentUser, handleRefresh }) {
  // Setting the current date in YYYY-MM-DD format
  let currentDate = new Date().toJSON().slice(0, 10);

  // Defining the validation schema for the form using Yup
  const formSchema = yup.object().shape({
    compliment_text: yup.string().required("Must not be blank").min(1),
  });

  // Initializing Formik with configuration
  const formik = useFormik({
    initialValues: {
      compliment_text: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      // Handling the form submission
      fetch("/compliments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id: Date.now(),
          // compliment_id: Date.now(),
          compliment_text: values.compliment_text,
          // date_sent: currentDate,
          // public: false,
          // receiver: {
          //   email: user.email,
          //   position: user.position,
          //   user_id: user.user_id,
          //   username: user.username,
          // },
          // sender: {
          //   email: currentUser.email,
          //   position: currentUser.position,
          //   user_id: currentUser.user_id,
          //   username: currentUser.username,
          // },
          sender_id: currentUser.user_id,
          receiver_id: user.user_id,
        }),
      }).then((response) => {
        if (response.status == 200) {
          console.log("Successful post");
        }
      });
      // Resetting the form and refreshing the parent component after submission
      resetForm();
      handleRefresh();
    },
  });

  return (
    <div>
      {/* Form for submitting new compliments */}
      <form onSubmit={formik.handleSubmit} style={{ margin: "15px" }}>
        <label htmlFor="compliment_text">
          Write a compliment to {user.username}!
        </label>
        <br />
        <textarea
          id="compliment_text"
          name="compliment_text"
          onChange={formik.handleChange}
          value={formik.values.compliment_text}
          rows="15"
          style={{ width: "50%" }}
        />
        {/* Displaying form validation error */}
        <p style={{ color: "red" }}>{formik.errors.compliment_text}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewComplimentForm;
