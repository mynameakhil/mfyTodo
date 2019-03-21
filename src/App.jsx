import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      notes: [],
      updteBtn: true,
      idt: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`
      )
      .then(res => {
        const note = res.data;
        const value = [...note.result.user];
        this.setState({ notes: value });
      });
  }

  addTodo(e) {
    if (e.key === "Enter") {
      const values = e.target.value;

      this.setState({
        noteText: ""
      });
      const { notes } = this.state;
      this.setState({ notes: [...notes, values] });

      axios
        .post(
          `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
          {
            user: notes
          }
        )
        .then(res => {
          console.log(res);
        });
    }
  }

  editTodo(val, index) {
    this.setState({
      noteText: val,
      updteBtn: false,
      idt: index
    });
    this.state.notes[index] = "";
    this.setState({
      notes: [...this.state.notes]
    });
  }

  updateList() {
    const ide = this.state.idt;
    this.state.notes[ide] = this.state.noteText;
    this.setState({
      notes: [...this.state.notes],
      noteText: "",
      updteBtn: true
    });
    const user = [...this.state.notes];
    axios
      .post(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
        {
          user
        }
      )
      .then(res => {
        console.log(res);
      });
  }

  deleteHandler(index) {
    const dlt = this.state.notes.splice(index, 1);
    this.setState({ notes: this.state.notes.filter(note => note !== dlt) });
    const user = [...this.state.notes];
    axios
      .post(
        `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`,
        { user }
      )
      .then(res => {
        console.log(res);
      });
  }

  render() {
    let lst;
    if (this.state.updteBtn) {
      lst = (
        <ul>
          <div>
            {this.state.notes.map((val, index) => (
              <li className="lst">
                {" "}
                {val}
                <button
                  className="btn2"
                  onClick={() => this.deleteHandler(index)}
                >
                  delete
                </button>
                <button onClick={() => this.editTodo(val, index)}>edit</button>
              </li>
            ))}
          </div>
        </ul>
      );
    } else {
      lst = (
        <div>
          <button className="btn2" onClick={() => this.updateList()}>
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
            value={this.state.noteText}
            onChange={e => this.setState({ noteText: e.target.value })}
            onKeyPress={e => this.addTodo(e)}
            placeholder="Enter the note"
          />
          {lst}
        </div>
      </div>
    );
  }
}
export default App;
