import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Input, Form } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";

const AddTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });

  const addNotes = item => {
    const path = props.history;
    const noteItems = [...(props.notes || []), item];
    props.add(noteItems, path);

    // if(props.state){props.history.push("/");}
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
  add: (noteItems, path) =>
    dispatch({ type: "ADD_NOTES", location: { data: noteItems, value: path } })
});
const mapStateToProps = state => ({
  notes: state.data
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
