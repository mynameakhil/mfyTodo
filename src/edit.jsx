import React from "react";
// import { prependOnceListener } from "cluster";

const EditTodo = () => (
  <div>
    {/* <h2>id:{props.match.parms.index}</h2> */}
    <h1>TO DO</h1>
    <input
      type="text"
      //   value={props.noteText}
      //   onChange={e => props.changed(e.target.value)}
      //   onKeyPress={e => props.Todo(e)}
      placeholder="Enter the note"
    />
    <button>update</button>
  </div>
);
export default EditTodo;
