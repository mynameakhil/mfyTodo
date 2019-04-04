import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button, Table } from "antd";
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
  const newNotes = notes.map((val, index) => ({
    number: index,
    note: val
  }));
  // const columns = [
  //   {
  //     title: "number",
  //     dataIndex: "number",
  //     key: "number"
  //   },
  //   {
  //     title: "note",
  //     dataIndex: "note",
  //     key: "note"
  //   }
  // ];

  return (
    <Table dataSource={newNotes} rowKey="number">
      <Table.Column
        title="number"
        dataIndex="number"
        key="number"
        width={50}
        render={number => <b>{number}</b>}
      />

      <Table.Column
        title="note"
        dataIndex="note"
        key="note"
        render={note => <b>{note}</b>}
      />
      <Table.Column
        title="edit"
        dataIndex="edit"
        key="edit"
        width={50}
        render={(_, B, index) => (
          <NavLink to={{ pathname: `/edit/${index}`, state: { notes } }}>
            <Button type="primary">Edit</Button>
          </NavLink>
        )}
      />
      <Table.Column
        width={50}
        title="delete"
        dataIndex="delete"
        key="delete"
        render={(_, B, index) => {
          console.log(index);
          return (
            <Button type="primary" onClick={() => deleteHandler(index)}>
              Delete
            </Button>
          );
        }}
      />
    </Table>
  );
  // <pre>{JSON.stringify(notes, null, 4)}</pre>;
}
export default ListTodos;
