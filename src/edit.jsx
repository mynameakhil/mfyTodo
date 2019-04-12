import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Form } from "antd";
import * as yup from "yup";
import "antd/dist/antd.css";
import { Formik } from "formik";

const { TextArea } = Input;
const EditTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });
  const { id } = props.match.params;
  const { notes } = props.location.state;

  const [noteText] = useState(notes[id]);
  const editUpdate = async val => {
    notes[id] = val;

    await axios.post(
      `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
      { currentNotes: notes }
    );
    props.history.push("/");
  };

  return (
    <Formik
      initialValues={{ note: noteText }}
      onSubmit={values => {
        setTimeout(() => {
          editUpdate(values.note);
        }, 400);
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <Form.Item
            help={touched.note && errors.note}
            validateStatus={touched.note && errors.note && "error"}
          >
            <TextArea
              name="note"
              type="text"
              placeholder="enter the note"
              autosize
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.note}
            />
          </Form.Item>
          <div style={{ margin: "24px 0" }} />
          <Button type="primary" onClick={handleSubmit}>
            Update
          </Button>
        </form>
      )}
      validationSchema={validationSchema}
    />
  );
};

export default EditTodo;
