import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./Notes.css";

function ListTodos(props) {
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL).then(res => {
      const notes = res.data.result.noteItems;
      props.fetch(notes);
    });
    const noteItems = [...props.notes];
    axios.post(process.env.REACT_APP_API_URL, { noteItems });
  }, []);

  const deleteHandler = index => {
    const dltNote = props.notes.splice(index, 1);
    props.dlte(props.notes.filter(note => note !== dltNote));
    const noteItems = props.notes;

    axios.post(process.env.REACT_APP_API_URL, { noteItems });
  };

  const newNotes = props.notes.map((item, index) => ({
    Number: index + 1,
    Note: item
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
          <NavLink to={{ pathname: `/edit/${index}` }}>
            <Button type="primary">Edit</Button>
          </NavLink>
        )}
      />
      <Table.Column
        width={50}
        title="Delete"
        dataIndex="Delete"
        key="Delete"
        render={(_, A, index) => (
          <Button
            type="primary"
            onClick={() => {
              deleteHandler(index);
            }}
          >
            Delete
          </Button>
        )}
      />
    </Table>
  );

  // return <pre>{JSON.stringify(props.notes)}</pre>;
}
const mapDispatchToProps = dispatch => ({
  dlte: note => dispatch({ type: "DELETE", value: note }),
  fetch: notes => dispatch({ type: "FETCH", value: notes })
});

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTodos);
