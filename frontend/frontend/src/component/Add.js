import React, {useState} from 'react'

export default function Add(props) {
    const [newTitle, setNewTitle] = useState('')
    
    const createNewTodo=()=>{
        console.log('CreateNewTodo');
        props.createFunc({title: newTitle, isCompleted: false})
    }
    return (
        <div className='m-3'>
            <form>
                <div className="form-floating mb-3">
                    <input type='text' 
                    placeholder='Write new title here ....' 
                    onChange={(e)=>{
                        setNewTitle(e.target.value)
                    }}
                    className="form-control" 
                    />
                    <label htmlFor="floatingInput">
                        New Todo Title</label>
                </div>
                
                <div className='text-center'>         
                    <button className="btn btn-outline-secondary" 
                    onClick={createNewTodo}>
                        Create New Todo</button>
                </div>
            </form>
            
        </div>
    )
}
