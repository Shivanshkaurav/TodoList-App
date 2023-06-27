import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [todo, setToDo] = useState("");
  const [todos, setToDos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(editId){
      const editTodo= todos.find((i)=>i.id=== editId);
      const updatedTodos = todos.map((t)=>t.id === editTodo?(t={id: t.id, todo}):{id: t.id, todo: t.todo})
      setToDos(updatedTodos);
      setEditId(0);
      setToDo("");
      return;
    }

    if(todo!== ''){
      setToDos([{id: `${todo}-${Date.now()}` , todo}, ...todos])
      setToDo("");
    }
  }

  const handleDelete= (id)=>{
     const delTodo = todos.filter((to)=>to.id !== id);
     setToDos([...delTodo])
  }

  const handleEdit= (id)=>{
    const editTodo = todos.find((i)=>i.id === id);
    setToDo(editTodo.todo);
    setEditId(id);
  }

  return(
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className='todoForm' onSubmit={handleSubmit} >
          <input value={todo} type="text" onChange={(e)=> setToDo(e.target.value)} />
          <button type='submit'> {editId?"Edit":"Go"}</button>
        </form>

        <ul className='allTodos'>
          {
            todos.map((t)=>(
              <li className='singleTodo'>
                <span className='todoText' key={t.id}>{t.todo}</span>
                <button onClick={()=>handleEdit(t.id)}>edit</button>
                <button onClick={()=>handleDelete(t.id)}>delete </button> 
              </li>
            ))
          }
          
        </ul>
      </div>
    </div>
  );
}

export default App
