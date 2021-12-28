import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Routes, Route, Link } from "react-router-dom";

import Todo from './component/Todo'
import Add from './component/Add'
import Register from './component/Register';
import Login from './component/Login';

function App() {

  const [tasks, setTask] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

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

  const logoutFunc=()=>{
  setIsLoggedIn(false)
  setUsername("")
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
      <p>{username}</p>



<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Todos</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" 
    id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"> 
          href="#">Home
          <Link to="/home" 
          className="nav-link active">
            Home</Link>
        </li>
        <li class="nav-item">
          <Link to="/login" className='nav-link'>Login</Link>
        </li>
        <li class="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<br/>
<button onClick={logoutFunc}>Logout</button>

      <Routes>
        <Route path="/home" element={
        <div className='Home'>
          <button onClick={getData}>GET TASKS</button>
          <button onClick={deleteTasks}>DELETE completed tasks</button>
          <button onClick={()=>{
            filterData(true)
            }}>GET DONE
          </button>
          <button onClick={()=>{
            filterData(false)
            }}>GET PENDING
          </button>
          <Add createFunc={postNewTodo}/>
          {mapOverTasks}
        </div>} />
        <Route path="/login" element={<Login 
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>


      

    </div>
  );
}

export default App;
