import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "antd/dist/antd.css";

const AddTodo = props => {
  const [noteText, setNoteText] = useState("");
  const addNotes = async () => {
    const url = `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`;
    const { data } = await axios.get(url);
    if (data.result === null) {
      await axios.post(url, {
        currentNotes: [noteText]
      });
    } else {
      await axios.post(url, {
        currentNotes: [...data.result.currentNotes, noteText]
      });
    }

    props.history.push("/");
  };
  const { TextArea } = Input;
  return (
    <div>
      <h1>Please Write Your Notes</h1>

      <TextArea
        placeholder="enter the note"
        autosize
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
      />
      <div style={{ margin: "24px 0" }} />

      <Button type="primary" onClick={addNotes}>
        Add
      </Button>
    </div>
  );
};
export default AddTodo;
