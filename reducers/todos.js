import {Action} from 'redux'

const LOAD = 'todos/LOAD';
const CREATE = 'todos/CREATE';
const REMOVE = 'todos/REMOVE';

export const loadTodos = (todos) => ({type: LOAD, todos})
export const createTodo = (todo) => ({type: CREATE, todo})
export const removeTodo = (todoId) => ({type: REMOVE, todoId})

const reducer = (todos=[], action) => {
    console.log(action.type);
    switch (action.type) {
        case LOAD:
            return action.todos
        case CREATE:
            return [...todos, action.todo].sort(_dateSort)
        case REMOVE:
            return todos.filter(x=>(x.id!==action.todoId))
        default:
            console.log("Unknown action!")
            return todos;
    }
}

export default reducer;
