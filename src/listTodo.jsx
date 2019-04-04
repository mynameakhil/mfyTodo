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
    Number: index + 1,
    Note: val
  }));

  return (
    <Table dataSource={newNotes} rowKey="number">
      <Table.Column
        title="Number"
        dataIndex="Number"
        key="Number"
        width={50}
        render={Number => <b>{Number}</b>}
      />

      <Table.Column
        title="Note"
        dataIndex="Note"
        key="Note"
        render={Note => <b>{Note}</b>}
      />
      <Table.Column
        title="Edit"
        dataIndex="Edit"
        key="Edit"
        width={50}
        render={(_, B, index) => (
          <NavLink to={{ pathname: `/edit/${index}`, state: { notes } }}>
            <Button type="primary">Edit</Button>
          </NavLink>
        )}
      />
      <Table.Column
        width={50}
        title="Delete"
        dataIndex="Delete"
        key="Delete"
        render={(_, B, index) => (
          <Button type="primary" onClick={() => deleteHandler(index)}>
            Delete
          </Button>
        )}
      />
    </Table>
  );
  // <pre>{JSON.stringify(notes, null, 4)}</pre>;
}
export default ListTodos;
