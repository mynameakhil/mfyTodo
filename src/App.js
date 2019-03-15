import React, { Component } from 'react';
import './App.css';
import { toUnicode } from 'punycode';

class App extends Component {
  state = {
    noteText: '',
    notes: [],
    updteBtn:true,
    id:''
  } 
  editTodo(val,index){
    this.setState({noteText:val,updteBtn:false,id:index});
    this.state.notes[index]='';
    this.setState({notes:[...this.state.notes]});
  }
  updateList(e){
   const ide=this.state.id;
    this.state.notes[ide] = this.state.noteText;
    this.setState({ notes: [...this.state.notes], noteText: "" ,updteBtn:true})
  }
  addTodo = (e) =>{
    if (e.key === 'Enter') {
     this.setState({notes: [e.target.value, ...this.state.notes], noteText:""})
    }
  }
  render() {
    let lst;
    if(this.state.updteBtn)
    {lst=(
      <ul>
        <div>
          {this.state.notes.map((val, index) => <li className="lst">{val}
            <button  onClick={() => this.setState({ notes: this.state.notes.filter(note => note !== val) })}>delete</button>
            <button  onClick={() => this.editTodo(val, index)}>edit</button>
          </li>)}
        </div>
      </ul>);
    }
    else{
     lst=( 
      <div>
        <button className="btn2" onClick={()=>this.updateList()}>update</button>
      </div>);
    }

    return (
     <div >
      <div className="App">
        <h1 >TO DO</h1>
         <input type = "text" 
          value={this.state.noteText}
          onChange={(e) => this.setState({noteText:e.target.value})}
          onKeyPress={this.addTodo}
          placeholder = 'Enter the note'/> 
        <div className="btn" onClick={(e) => this.setState({notes: [this.state.noteText, ...this.state.notes], noteText:""})}>+</div>
        {lst}
      </div>
    </div>
  
  );
  }
}

export default App;
