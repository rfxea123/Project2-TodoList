import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Todo from './component/Todo'
import Add from './component/Add'

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

  const postNewTodo=(body)=>{
    axios
    .post('http://localhost:5000/tasks',body)
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      // setTask(Response.data)
      getData()
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }

  const deleteTodo=(id)=>{
    axios
    .delete(`http://localhost:5000/tasks/${id}`)
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      // setTask(Response.data)
      getData()
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }
  const toggleTodo=(id,newStatus)=>{
    axios
    .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      // setTask(Response.data)
      getData()
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }

  const deleteTasks=()=>{
    axios
    .delete(`http://localhost:5000/tasks`)
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      // setTask(Response.data)
      getData()
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }

  const filterData=(status)=>{
    axios
    .get(`http://localhost:5000/filter?isCompleted=${status}`)
    .then((Response)=>{
      console.log('DATA: ' , Response.data);
      setTask(Response.data)
    })
    .catch((err)=>{
      console.log('ERR: ', err);
    })
  }

  const mapOverTasks=tasks.map((taskObj, i)=>( 
  <Todo key={taskObj._id} 
  task={taskObj} 
  deleteTodo={deleteTodo}
  toggleTodo={toggleTodo}/>
  ))
  return (
    <div className="App">
      <p>app</p>
      <Add createFunc={postNewTodo}/>
      <button onClick={getData}>GET TASKS</button>
      <button onClick={deleteTasks}>DELETE completed tasks</button>
      <button onClick={()=>{
        filterData(true)
      }}>GET DONE</button>
      <button onClick={()=>{
        filterData(false)
      }}>GET PENDING</button>


      {mapOverTasks}

    </div>
  );
}

export default App;
