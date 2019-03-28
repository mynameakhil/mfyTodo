import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddTodo = props => {
  const [noteText, setNoteText] = useState("");
  const addNotes = async () => {
    const url = `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`;
    const { data } = await axios.get(url);
    await axios.post(url, {
      currentNotes: [noteText, ...data.result.currentNotes]
    });

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
AddTodo.propTypes = {
  history: PropTypes.shape({
    url: PropTypes.string,
    push: PropTypes.func
  })
};
AddTodo.defaultProps = {
  history: {}
};
export default AddTodo;
