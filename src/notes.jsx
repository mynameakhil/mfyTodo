import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notes.css";

function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNote] = useState([]);
  const [isUpdteBtn, setUpdateBtn] = useState(true);
  const [currentId, setIdt] = useState("");
  useEffect(() => {
    console.log("calling api");
    axios
      .get(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`
      )
      .then(res => {
        const getNotes = res.data;

        const currentNotes = [...getNotes.result];

        setNote(currentNotes);
      });
  }, []);

  const addTodo = e => {
    if (e.key === "Enter") {
      const getNotes = e.target.value;

      setNoteText("");

      const currentNotes = [...notes, getNotes];

      setNote(currentNotes);

      axios
        .post(
          `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
          currentNotes
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    }
  };

  const editTodo = (val, index) => {
    setNoteText(val);
    setUpdateBtn(false);
    setIdt(index);

    setNote((notes[index] = ""));
    setNote([...notes]);
  };

  const updateList = () => {
    const currentIndex = currentId;
    notes[currentIndex] = noteText;
    setNote([...notes]);
    setNoteText("");
    setUpdateBtn(true);

    const currentNotes = notes;
    axios
      .post(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
        currentNotes
      )
      .then(res => {
        console.log(res);
      });
  };

  const deleteHandler = index => {
    const dltNote = notes.splice(index, 1);
    setNote(notes.filter(note => note !== dltNote));
    const currentNotes = notes;

    axios
      .post(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
        currentNotes
      )
      .then(res => {
        console.log(res);
      });
  };

  let list;
  if (isUpdteBtn) {
    list = (
      <ul>
        <div>
          {notes.map((val, index) => (
            <li className="lst">
              {val}
              <button className="btn2" onClick={() => deleteHandler(index)}>
                delete
              </button>
              <button onClick={() => editTodo(val, index)}>edit</button>
            </li>
          ))}
        </div>
      </ul>
    );
  } else {
    list = (
      <div>
        {/* Clicked={this.updateList} */}
        <button className="btn2" onClick={() => updateList()}>
          update
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="App">
        <h1>TO DO</h1>
        <input
          type="text"
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          onKeyPress={e => addTodo(e)}
          placeholder="Enter the note"
        />
        {list}
      </div>
    </div>
  );
}
export default Notes;
