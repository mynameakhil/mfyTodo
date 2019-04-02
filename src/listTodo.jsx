import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button, List } from "antd";
import "antd/dist/antd.css";

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
                // <li className="lst" key={val}>
                //   {val}

                <List
                  size="large"
                  header={<div>notes</div>}
                  footer={<div>end</div>}
                >
                  {/* bordered // dataSource={data} */}
                  {/* // renderItem={item => <List.Item>{val}</List.Item>} */}{" "}
                  {/* <button className="btn2" onClick={() => deleteHandler(index)}>
                    delete
                  </button> */}
                  {val}
                  <Button type="primary" onClick={() => deleteHandler(index)}>
                    Delete
                  </Button>
                  <NavLink
                    to={{ pathname: `/edit/${index}`, state: { notes } }}
                  >
                    <Button type="primary">Edit</Button>
                  </NavLink>
                </List>
                // </li>
              ))}
            </div>
          </ul>
        }
      </div>
    </div>
  );
}
export default ListTodos;
