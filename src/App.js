import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    noteText: '',
    notes: []

    
  }
  
updateNoteText(input){
  this.setState({noteText:input},
    () => { console.log(this.state.noteText);});
  }
takeValue(input){
  let arrNote=this.state.notes;
  arrNote.push(input);
  this.setState({noteText:arrNote})
  this.setState({noteText:''})
  console.log(input);
}
deleteHandler(indx){
  let arr=[...this.state.notes];
  arr.splice(indx,1);
  this.setState({notes:arr})

}
keyPress(event,input){
  if(event.key==='Enter'){
    let arrNote = this.state.notes;
    arrNote.push(input);
    this.setState({ noteText: arrNote })
    this.setState({ noteText: '' })
    console.log(input);
  }
}

  render() {
    return (
      <div className="App">
        <h1>TO DO</h1>
         < input type = "text" className="textInput"
           value={this.state.noteText}
          onChange={(e) => {this.updateNoteText(e.target.value)}}
          onKeyPress={(e) => { this.keyPress(e,this.state.noteText) }} 
        placeholder = 'Enter the note'/> 
        <div className="btn" onClick={() => this.takeValue(this.state.noteText)}>+</div>
        <ul>
          {this.state.notes.map((val, indux) => <li className="lst">{val}
          <button className="btn2" onClick={()=>this.deleteHandler(indux)}>delete</button>
            <button className="btn2" onClick={() => this.deleteHandler(indux)}>edit</button>
          </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
