import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {addActionType} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id:string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-FILTER'
    newFilterValue: FilterValuesType,
    id: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TITLE'
    id: string
    title: string
}

export type ActionType = ChangeTodoListTitleActionType | ChangeTodolistFilterActionType |
    AddTodolistActionType | RemoveTodolistActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType):
    Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: 'all'
            }
            return [newTodoList, ...state]
        }
        case "CHANGE-FILTER": {
            /* const todoList = state.find(tl => tl.id === action.todoListID)
             if (todoList) {
                 todoList.filter = action.newFilterValue
                 return [...state]
             }*/
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.newFilterValue}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        default:
            return state
    }
}
export const addTodolistAC = (title: string,todoListID:string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        id:todoListID,
        title

    }
}
export const RemoveTodolistActionAC = (todoListID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListID

    }
}
export const ChangeTodolistFilterActionAC = (todoListID: string, newFilterValue: FilterValuesType)
    : ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-FILTER',
        id: todoListID,
        newFilterValue: newFilterValue

    }
}
export const ChangeTodoListTitleActionAC = (todoListID: string, title: string)
    : ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TITLE',
        id: todoListID,
        title
    }
}