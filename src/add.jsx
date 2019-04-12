import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Input, Form } from "antd";
import "antd/dist/antd.css";

const AddTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });

  const addNotes = async val => {
    const url = `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`;
    const { data } = await axios.get(url);
    if (data.result === null) {
      await axios.post(url, {
        currentNotes: [val]
      });
    } else {
      await axios.post(url, {
        currentNotes: [...data.result.currentNotes, val]
      });
    }

    props.history.push("/");
  };

  const { TextArea } = Input;

  return (
    <Formik
      initialValues={{ note: "" }}
      onSubmit={values => {
        setTimeout(() => {
          addNotes(values.note);
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
        <>
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
            ADD
          </Button>
        </>
      )}
      validationSchema={validationSchema}
    />
  );
};
export default AddTodo;
