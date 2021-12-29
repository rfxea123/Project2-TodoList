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
  <Todo 
  key={taskObj._id} 
  task={taskObj} 
  deleteTodo={deleteTodo}
  toggleTodo={toggleTodo}
  />
  ))
  return (
    <div className="">
      <p>Name {username}</p>



<nav className="navbar navbar-expand-lg navbar-light bg-light m-3">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Todos</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" 
    id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item"> 
          <Link to="/home" 
          className="nav-link active">
            Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className='nav-link'>Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<br/>
<div className='m-3 text-center'>
<button class="btn btn-outline-info" onClick={logoutFunc}>Logout</button>
<button type="button" 
class="btn btn btn-outline-dark m-2" 
data-bs-toggle="popover" 
title="Todo List" 
data-bs-content='Welcome to Todo List web Application'>
{username? 'Welcome '+ username: 'Please Login'}</button>
</div>

      <Routes>
        <Route path="/home" element={
        <div className='Home m-3'>
          <div className='Home mb-3 text-center'>
          <button className="btn btn-primary m-2" onClick={getData}>GET TASKS</button>
          <button  className="btn btn-danger m-2" onClick={deleteTasks}>DELETE Completed Tasks</button>
          <button className="btn btn-outline-success m-2" onClick={()=>{
            filterData(true)
            }}>GET DONE
          </button>
          <button className="btn btn-outline-warning m-2" onClick={()=>{
            filterData(false)
            }}>GET PENDING
          </button>
          
          </div>
          <Add createFunc={postNewTodo}/>
          <div className="list-group">
            {mapOverTasks}
          </div>
        </div>
        }/>
        <Route path="/login" element={<Login 
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>


      

    </div>
  );
}

export default App;
