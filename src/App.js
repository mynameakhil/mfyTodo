import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {
  state = {
    noteText: '',
    notes: [],
    // updteBtn:true,
    // idt:'',
    
  } 
  // editTodo(val,index){
  //   this.setState({noteText:val,updteBtn:false,id:index});
  //   this.state.notes[index]='';
  //   this.setState({notes:[...this.state.notes]});
  // }
  // updateList(e){
  //  const ide=this.state.idt;
  //   this.state.notes[ide] = this.state.noteText;
  //   this.setState({ notes: [...this.state.notes], noteText: "" ,updteBtn:true})
  // }
  addTodo = (e) =>{
    if (e.key === 'Enter') {
    // this.setState({notes: [e.target.value, ...this.state.notes], noteText:""})
     const values=e.target.value
     this.setState({noteText:""});
    //  console.log(values)
     e.target.value="";
     
     this.state.notes.push(values);
      const user =[...this.state.notes];
    

     
       
     
  

    console.log(this.state.notes);
    console.log(user)
    
      axios.post(`https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`, {user})
      .then(res => {
        console.log(res);
        console.log(res.data);
        // console.log(user);


      })
  }
  }
  componentDidMount() {
      axios.get(`https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`)
      .then(res => {
        const note=res.data;
        // console.log(note.result.user[0]);
        //   console.log(note.result.user)
        const value = [...note.result.user[0]];
        // console.log(value);
        this.setState({notes:value})
        // console.log(this.state.notes);
        // console.log(this.state.notes);
        }).catch(e=>console.log(e.message))
      }



  

    // let lst;
    // if(this.state.updteBtn)
    // {lst=(
    //   <ul>
    //     <div>
          // {this.state.notes.map( val=> <li className="lst">{val} </li>)} 
            /* <button className="btn2"   onClick={() => this.setState({ notes: this.state.notes.filter(note => note !== val) })}>delete</button>
            <button className="btn2"   onClick={() => this.editTodo(val, index)}>edit</button> */
         
          /* {this.state.persons.map(person => <li>{person}</li>)} */
    //     </div>
    //   </ul>);
    // }
    // else{
    //  lst=( 
    //   <div>
    //     <button className="btn2" onClick={()=>this.updateList()}>update</button>
    //   </div>);
    // }
render() {
    return (
     <div >
      <div className="App">
        <h1 >TO DO</h1>
         <input type = "text" 
          value={this.state.noteText}
          onChange={(e) => this.setState({noteText:e.target.value})}
          onKeyPress={this.addTodo}
          placeholder = 'Enter the note'/> 
        {/* <div className="btn" onClick={(e) => this.setState({notes: [this.state.noteText, ...this.state.notes], noteText:""})}>+</div> */}
          < div > <ul> {this.state.notes.map(val => <li className="lst"> {val} </li>)}</ul > </div>
          
      </div>
    </div>
  
  );
  }
}

export default App;
