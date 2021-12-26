import React,{useState} from 'react'
import axios from 'axios'

export default function Register() {
    const [email, setEmali] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const registerFunc=(e)=>{
        e.preventDefault()
        console.log('ggg');
        const newUser={
            email,password,username
        }
        axios
        .post('http://localhost:5000/users/register', newUser)
        .then((Response)=>{
            console.log('DATA: ' , Response.data);
        })
        .catch((err)=>{
            console.log('ERR: ', err);
        })
    }
    return (
        <div className='Register'>
            <form>
                <label htmlFor='email'>Email</label>
                <input 
                type="email" 
                placeholder='write email here'
                onChange={(e)=>{
                    setEmali(e.target.value)
                }}
                value={email}
                />
                <br/>
                <label htmlFor='password'>Psaaword</label>
                <input 
                type="password" 
                placeholder='write password here'
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                value={password}
                />
                <br/>
                <label htmlFor='username'>Username</label>
                <input 
                type="text" 
                placeholder='write username here'
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                value={username}
                />
                <br/>
                <input type="submit" value="Register" 
                onClick={registerFunc}/>
            </form>
        </div>
    )
}
