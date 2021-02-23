import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todoListID: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-FILTER'
    newFilterValue: FilterValuesType,
    todoListID: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TITLE'
    todoListID: string
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
                if (tl.id === action.todoListID) {
                    return {...tl, filter: action.newFilterValue}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            return state.map(tl => {
                if (tl.id === action.todoListID) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListID)
        }
        default:
            return state
    }
}