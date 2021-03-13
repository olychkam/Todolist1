import {FilterValuesType, TaskStateType, TodoListType} from "../AppReducer";
import {v1} from "uuid";

export type RemoveTasksActionType = {
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
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
const todoListID1 = v1()
const todoListID2 = v1()
let initialState:TaskStateType={
    [todoListID1]: [
        {id: v1(), title: "js", isDone: true},
        {id: v1(), title: "css", isDone: false},
        {id: v1(), title: "html", isDone: true},
        {id: v1(), title: "react", isDone: true},
    ],
    [todoListID2]: [{id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Beer", isDone: false},]
}

export type ActionType = RemoveTasksActionType | addActionType | changeTaskStatusType|
    changeTaskTitleType|AddTodolistActionType|RemoveTodolistActionType

export const tasksReducer = (state=initialState, action: ActionType):TaskStateType => {

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
            const stateCopy={...state}

            stateCopy[action.todolistId]=[]
            return stateCopy /*{...state,
                [action.id]:[]
            }*/
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
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}
export const addTaskAC = (title: string, todolistId: string): addActionType => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
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
export const addTodolistAC = (title: string,todolistId:string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId

    }
}
export const RemoveTodolistActionAC = (todoListID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListID

    }
}