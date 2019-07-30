import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Table, Alert } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./Notes.css";

function ListTodos(props) {
  useEffect(() => {
    props.fetch();
  }, []);
  const deleteHandler = index => {
    const dltNote = props.notes.splice(index, 1);
    const noteItems = props.notes.filter(note => note !== dltNote);
    props.delete(noteItems);
  };

  const newNotes = (props.notes && props.notes.length) ? props.notes.map((item, index) => ({
    Number: index + 1,
    Note: item
  }))
  : []

  //  return <pre>{JSON.stringify(props.notes)}</pre>;
  if (props.error) {
    return (
      <div>
        <Alert
          message="Error"
          description="your connection not seccure."
          type="error"
          showIcon
        />
      </div>
    );
  }
  return (
    <Table dataSource={newNotes} rowKey="Number" loading={props.loading}>
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
}
const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch({ type: "FETCH_NOTES" }),
  delete: noteItems => dispatch({ type: "DELETE_NOTES", data: noteItems })
});

const mapStateToProps = state => ({
  notes: state.data,
  loading: state.loading,
  error: state.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTodos);
