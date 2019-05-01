import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Form } from "antd";
import * as yup from "yup";
import "antd/dist/antd.css";
import { Formik } from "formik";
import { connect } from "react-redux";

const { TextArea } = Input;
const EditTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });
  const { id } = props.match.params;

  const [noteText] = useState(props.notes[id]);
  const editUpdate = async val => {
    const notes = [...props.notes];

    notes[id] = val;

    await axios.post(process.env.REACT_APP_API_URL, { noteItem: notes });
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
const mapDispatchToProps = dispatch => ({
  dlte: note => dispatch({ type: "DELETE", value: note })
});
const mapStateToProps = state => ({
  notes: state.notes
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo);
