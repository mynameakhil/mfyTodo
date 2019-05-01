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

  const addNotes = async val => {
    props.add(val);
    const noteItem = props.notes;

    noteItem.push(val);
    console.log(noteItem);
    const url = `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`;

    await axios.post(url, { noteItem });

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
  add: note => dispatch({ type: "ADD", value: note })
});
const mapStateToProps = state => ({
  notes: state.notes
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
