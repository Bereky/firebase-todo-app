import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import './index.css'
import Task from './Task';
import { addTodo, collRef } from '../firebase/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import ReactLoading from 'react-loading';

const App = () => {

  const [ todo, setTodo ] = useState()
  const [ loading, setLoading ] = useState()

  const todoList = useContext(TodoContext)

  /* const addTodoTask = (e) => {
    e.preventDefault();
    todoList.addTodo({name: todo})
    addTodo(todo)
  } */

  const handleInputChange = (e) => {
    setTodo(e.target.value)
  }


  // adding the todos

  const addTodoTask = async (e) => {

    e.preventDefault()
    try{
        const docRef = await addDoc(collRef, {
            name: todo
        })
        console.log("new doc inserted", docRef.id)
        todoList.addTodo({name: todo, id: docRef.id})
    }
    catch(e){
        console.log("Error: ", e)
    }
}

  const getTodos = async () => {
    try{
        const snapshot = await getDocs(collRef)
        snapshot.forEach((todos) => {
          todoList.addTodo({...todos.data(), id: todos.id})
      })
      setLoading(false)
    }
    catch(e){
        console.log("Error: ", e)
    }
}

  useEffect(() => {
      setLoading(true)
      getTodos()
  }, [])
  return (
      <div className="card todo-list container">
        <div className="add-task">
          <div className="todo-header">
            <h1>Todo List</h1>
          </div>
          <form className="task-add" onSubmit={addTodoTask}>
            <div className="task-add-form"  >
              <input className="form-control m-1" type="text" placeholder='Insert task' onChange={handleInputChange} required/>
              <button className="btn btn-primary m-1 form-control add-task-button" type='submit'>Add task</button>
            </div>
          </form>
        </div>
        <div className="task-list my-2">
          { loading && <ReactLoading type="bubbles" color="fff" height={100} width={50} /> }
          {todoList.todos.map((todo) => <Task name={todo.name} key={todo.id} id={todo.id}/>)}
        </div>
      </div>
  );
}

export default App;
