import {Action} from 'redux'

const LOAD = 'todos/LOAD';
const CREATE = 'todos/CREATE';
const REMOVE = 'todos/REMOVE';

export const loadTodos = (todos) => ({type: LOAD, todos})
export const createTodo = (todo) => ({type: CREATE, todo})
export const removeTodo = (todo) => ({type: REMOVE, todo})

const reducer = (todos=[], action) => {
    console.log(action.type);
    switch (action.type) {
        case LOAD:
            return action.todos
        case CREATE:
            return [...todos, action.todo]
        case REMOVE:
            return todos.filter(x=>(x!==action.todo))
        default:
            console.log("Unknown action!")
            return todos;
    }
}

export default reducer;
