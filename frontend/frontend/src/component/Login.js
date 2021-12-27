import axios from 'axios'
import React,{useState} from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const loginFunc=(e) =>{
        e.preventDefault()
        const userInfo={
            email,
            password
        }
        axios
        .post('http://localhost:5000/users/login', userInfo)
        .then ((response) =>{
            console.log('DATA: ', response.data);
        })
        .catch((err)=>{
            console.log('ERR: ', err);
        })
    }

    return (
        <div className='Login'>
            <form action=''>
                <label htmlFor=''>Email:</label>
                <input onChange={(e)=>{
                    setEmail(e.target.value)
                }} 
                value={email}
                type='email'
                placeholder='write email here ...'/>
                <br/>
                <label htmlFor=''>Password:</label>
                <input onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                value={password}
                type='password' 
                placeholder='write password here ...'/>
                <br/>
                <input type='submit' value='Login' 
                onClick={loginFunc}/>
            </form>
            
        </div>
    )
}
