import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().min(5).max(30).required(),
  });

  
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/loginreg/registration", data).then((response) => {
      console.log(data);
      console.log(response);
      let msg = document.getElementById("message");     //grabs the html id of message below.
      msg.innerHTML = response.data;
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Username"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Password"
          />

          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
            placeholder="email"
          />

          <button type="submit"> Register</button>
          <p id="message"></p> 
        </Form>
      </Formik>
    </div>
  );



}

export default Register;