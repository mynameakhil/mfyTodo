import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import * as yup from "yup";
import "antd/dist/antd.css";
import { Formik } from "formik";
import { connect } from "react-redux";

const EditTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });
  const { id } = props.match.params;

  const [noteText] = useState(props.notes[id]);

  const editUpdate = item => {
    const noteItems = [...props.notes];
    noteItems[id] = item;
    const path = props.history;
    props.edit(noteItems, path);
  };
  const { TextArea } = Input;
  return (
    <Formik
      initialValues={{ note: noteText }}
      onSubmit={values => {
        editUpdate(values.note);
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
const mapDispatchToProps = dispatch => ({
  edit: (noteItems, path) =>
    dispatch({ type: "EDIT_NOTES", location: { data: noteItems, value: path } })
});
const mapStateToProps = state => ({
  notes: state.data,
  loading: state.loading,
  error: state.error
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo);
