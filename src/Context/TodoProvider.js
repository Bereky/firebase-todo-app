import { useState } from "react"
import { removeTodo } from "../firebase/firebase"
import { TodoContext } from "./TodoContext"

export const TodoProvider = ({ children }) => {

    const [ todos, setTodos] = useState([])

    const addTodoTask = (data) => {
        setTodos(prevData => [...prevData, data])
    }

    const removeTodos = (todoId) => {
        removeTodo(todoId)
        setTodos(todos.filter((prevTodo) => prevTodo.id !== todoId))

    }

    const todoCtx = {
        todos: todos,
        addTodo: addTodoTask,
        removeTodo: removeTodos
    }

    return (
        <TodoContext.Provider value={todoCtx}>
            {children}
        </TodoContext.Provider>
    )
}