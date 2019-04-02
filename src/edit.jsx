import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

const EditTodo = props => {
  const { id } = props.match.params;
  const { notes } = props.location.state;

  const [noteText, setNoteText] = useState(notes[id]);
  const editUpdate = async () => {
    notes[id] = noteText;
    await axios.post(
      `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
      { currentNotes: notes }
    );
    props.history.push("/");
  };
  return (
    <div>
      <h1>TO DO</h1>
      {/* <input
        type="text"
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
        placeholder="Enter the note"
      /> */}
      <TextArea
        placeholder="enter the note"
        autosize
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
      />
      <div style={{ margin: "24px 0" }} />

      {/* <button onClick={editUpdate}>update</button> */}
      <Button type="primary" onClick={editUpdate}>
        Update
      </Button>
    </div>
  );
};
export default EditTodo;
