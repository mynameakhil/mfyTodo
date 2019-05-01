import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Input, Form } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";

const AddTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });

  const addNotes = async item => {
    props.add(item);
    const noteItems = props.notes;

    noteItems.push(item);

    await axios.post(process.env.REACT_APP_API_URL, { noteItems });

    props.history.push("/");
  };

  return (
    <Formik
      initialValues={{ note: "" }}
      onSubmit={values => {
        addNotes(values.note);
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
            <Input
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
const mapDispatchToProps = dispatch => ({
  add: item => dispatch({ type: "ADD", value: item })
});
const mapStateToProps = state => ({
  notes: state.notes
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
