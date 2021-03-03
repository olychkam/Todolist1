import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./tl-reducer";

export type FirstActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string

}

export type addActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type changeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}


export type ActionType = FirstActionType | addActionType | changeTaskStatusType|
    changeTaskTitleType|AddTodolistActionType|RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {

    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCope = {...state}
            const todoListsTasks = state[action.todolistId]
            stateCope[action.todolistId] = todoListsTasks.filter(t => t.id != action.taskId)

            return stateCope
        }
        case "ADD-TASK": {
            let stateCope = {...state}
            const tasks = {id: v1(), title: action.title, isDone: false}
            let todoListsTasks = stateCope[action.todolistId]
            stateCope[action.todolistId] = [tasks, ...todoListsTasks]
            return stateCope
        }
        case "CHANGE-TASK-STATUS": {
            let stateCope = {...state}
            let todoListsTasks = stateCope[action.todolistId]
            let task = todoListsTasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCope
        }
        case "CHANGE-TASK-TITLE": {
            let stateCope = {...state}
            let todoListsTasks = stateCope[action.todolistId]
            let task = todoListsTasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title
            }
            return stateCope
        }
        case "ADD-TODOLIST": {
            return {...state,
                [action.id]:[]
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState={...state}
                delete copyState[action.id]
            return copyState
            }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): FirstActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    }
}
export const addTaskAC = (title: string, todolistId: string): addActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}
export const changeTaskStatusAC = (taskId: string,isDone: boolean, todolistId: string): changeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        isDone
    }
}
export const changeTaskTitleAC = (taskId: string,title: string, todolistId: string): changeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        taskId,
       title
    }
}