import { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import './index.css'

const Task = props => {
    const todoList = useContext(TodoContext)

    const removeTask = () => {
        todoList.removeTodo(props.id)
    }


    return ( 
        <div className="task card p-4 m-2">
          <div className="task-name">
            <span>{props.name}</span>
          </div>
          <div className="remove-task">
          <button className="btn btn-danger" onClick={removeTask}>x</button>
          </div>
        </div>
     );
}
 
export default Task;