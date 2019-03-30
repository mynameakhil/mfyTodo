import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./notes.css";

function ListTodos() {
  const [notes, setNote] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`
      )
      .then(res => {
        const getNotes = res.data;

        const todoNotes = [...getNotes.result.currentNotes];

        setNote(todoNotes);
      });
  }, []);

  const deleteHandler = index => {
    const dltNote = notes.splice(index, 1);
    setNote(notes.filter(note => note !== dltNote));
    const currentNotes = notes;

    axios.post(
      `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
      { currentNotes }
    );
  };

  return (
    <div>
      <div className="App">
        {
          <ul>
            <div>
              {notes.map((val, index) => (
                <li className="lst" key={val}>
                  {val}
                  <button className="btn2" onClick={() => deleteHandler(index)}>
                    delete
                  </button>
                  <NavLink
                    to={{ pathname: `/edit/${index}`, state: { notes } }}
                  >
                    <button> Edit</button>
                  </NavLink>
                </li>
              ))}
            </div>
          </ul>
        }
      </div>
    </div>
  );
}
export default ListTodos;
