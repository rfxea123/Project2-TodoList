import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Todo from './component/Todo'

function App() {

  const [tasks, setTask] = useState([])

  useEffect(()=>{
    getData()
  },[])
  const getData=()=>{
    axios
    .get('http://localhost:5000/tasks')
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      setTask(Response.data)
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }

  const mapOverTasks=tasks.map((taskObj, i)=>( 
  <Todo key={i} task={taskObj}/>
  ))

  return (
    <div className="App">
      <p>app</p>
      <button onClick={getData}>GET TASKS</button>


      {mapOverTasks}

    </div>
  );
}

export default App;
