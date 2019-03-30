import React, { useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>TO DO</h1>
      <input
        type="text"
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
        placeholder="Enter the note"
      />
      <button onClick={addNotes}>Add</button>
    </div>
  );
};
export default AddTodo;
