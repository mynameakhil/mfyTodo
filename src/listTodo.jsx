import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notes.css";
// import { Link } from "react-router-dom";

function ListTodos() {
  // const [noteText, setNoteText] = useState("");
  const [notes, setNote] = useState([]);
  // const [isUpdteBtn, setUpdateBtn] = useState(true);

  useEffect(() => {
    // console.log("calling api");
    axios
      .get(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`
      )
      .then(res => {
        const getNotes = res.data;
        // console.log(res.data.result.currentNotes);

        const todoNotes = [...getNotes.result.currentNotes];

        setNote(todoNotes);
      });
  }, []);

  // const addTodo = e => {
  //   if (e.key === "Enter") {
  //     const getNotes = e.target.value;

  //     setNoteText("");

  //     const currentNotes = [...notes, getNotes];

  //     setNote(currentNotes);

  //     axios
  //       .post(
  //         `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
  //         { currentNotes }
  //       )
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //       });
  //   }
  // };

  // const editTodo = () => {
  //   setBtn(true);
  //   // <Router>
  //   //   <div>
  //   //     <NavLink to="/">Home</NavLink>
  //   //     <Switch>
  //   //       <Route path="/edit" component={EditTodo} />>
  //   //     </Switch>
  //   //   </div>
  //   // </Router>;
  // };

  // ReactDOM.render(
  //   <Router>
  //     <div>
  //       <aside>
  //         <Link to={`/`}>Dashboard</Link>
  //         <Link to={`/about`}>About</Link>
  //       </aside>

  //       <main>
  //         <Route exact path="/" component={Dashboard} />
  //         <Route path="/about" component={About} />
  //       </main>
  //     </div>
  //   </Router>,
  //   document.getElementById('app')
  // )

  //   <div>
  //     <Route path="/edit" component={EditTodo} />;
  //   </div>;
  //   // setNoteText(val);
  //   // setUpdateBtn(false);
  //   // setIdt(index);

  //   // setNote((notes[index] = ""));
  //   // setNote([...notes]);
  // };

  // const updateList = () => {
  //   const currentIndex = currentId;
  //   notes[currentIndex] = noteText;
  //   setNote([...notes]);
  //   setNoteText("");
  //   setUpdateBtn(true);

  //   const currentNotes = notes;
  //   axios
  //     .post(
  //       `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
  //       { currentNotes }
  //     )
  //     .then(res => {
  //       console.log(res);
  //     });
  // };

  const deleteHandler = index => {
    const dltNote = notes.splice(index, 1);
    setNote(notes.filter(note => note !== dltNote));
    const currentNotes = notes;

    axios.post(
      `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
      { currentNotes }
    );
    // .then(res => {
    //   console.log(res);
    // });
  };

  // let list;
  // const isUpdteBtn = true;
  // if (isUpdteBtn) {
  //   list = (
  //     <ul>
  //       <div>
  //         {notes.map((val, index) => (
  //           <li className="lst">
  //             {val}
  //             <button className="btn2" onClick={() => deleteHandler(index)}>
  //               delete
  //             </button>
  //             <Link to="/edit/:index">
  //               <button> Edit</button>
  //             </Link>
  //             {/* <button onClick={<Route path="/edit" component={EditTodo} />}>
  //               edit
  //             </button> */}
  //           </li>
  //         ))}
  //       </div>
  //     </ul>
  //   );
  // } else {
  //   list = (
  //     <div>
  //       {/* Clicked={this.updateList} */}
  //       <button className="btn2">update</button>
  //     </div>
  //   );
  // }
  // if (isEdit) {
  //   <Router>
  //     <div>
  //       <NavLink to="/">Home</NavLink>

  //       <Switch>
  //         <Route path="/edit" component={EditTodo} />> //{" "}
  //       </Switch>
  //     </div>
  //   </Router>;
  // }

  return (
    <div>
      <div className="App">
        {/* changed={setNoteText}
        Todo={addTodo} */}
        {/* <h1>TO DO</h1>
        <input
          type="text"
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          onKeyPress={e => addTodo(e)}
          placeholder="Enter the note"
        /> */}
        {
          <ul>
            <div>
              {notes.map((val, index) => (
                <li className="lst">
                  {val}
                  <button className="btn2" onClick={() => deleteHandler(index)}>
                    delete
                  </button>
                  {/* <Link to="/edit/:index">
                    <button> Edit</button>
                  </Link> */}
                  {/* <button onClick={<Route path="/edit" component={EditTodo} />}>
                edit
              </button> */}
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
