import React from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "antd/dist/antd.css";
import { Formik } from "formik";

const { TextArea } = Input;
const EditTodo = props => {
  const { id } = props.match.params;
  const { notes } = props.location.state;

  const [noteText] = notes[id];
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
      validate={values => {
        const errors = {};
        if (!values.note) {
          errors.note = "Please Enter note";
        }
        return errors;
      }}
      onSubmit={values => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values.note);
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
          <TextArea
            name="note"
            type="text"
            placeholder="enter the note"
            autosize
            // value={noteText}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.note}
            // onChange={e => setNoteText(e.target.value)}
          />

          {errors.note && touched.note && errors.note}

          <div style={{ margin: "24px 0" }} />
          <Button type="primary" onClick={handleSubmit}>
            Update
          </Button>
        </form>
      )}
    />
  );
};

export default EditTodo;
// // onSubmit={handleSubmit}
