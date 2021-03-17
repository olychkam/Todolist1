import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./AppReducer";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
import {TaskStateType, TodoListType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle:(title:string,todoListID:string)=>void
}

export const TodoList=React.memo((props: TodoListPropsType)=>{
    console.log('todo')

    /*let todoList=useSelector<AppRootStateType,TodoListType>
    (state=>state.todolists.filter(todo=>todo.id===props.id)[0])

    let task=useSelector<AppRootStateType,TaskStateType>(state=>state.tasks)[props.id]
    let dispatch=useDispatch()*/

    const addTask =useCallback( (title: string) => {
        props.addTask(title, props.id)
    },[props.addTask,props.id])
    const all =useCallback( () => {
        props.changeFilter('all', props.id)
    },[ props.changeFilter,props.id])
    const active =useCallback( () => {
        props.changeFilter('active', props.id)
    },[props.changeFilter,props.id])
    const completed = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter,props.id])
    const changeTodoListTitle=(title:string)=>{
        props.changeTodoListTitle(title,props.id)
    }

    let allTaskForTodoList=props.tasks
    let taskForTodoList=allTaskForTodoList
    if (props.filter === 'active') {
        taskForTodoList = allTaskForTodoList.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        taskForTodoList = allTaskForTodoList.filter(t => t.isDone === true)
    }
    const tasks = taskForTodoList.map(t => {

        return <Task task={t} todolistId={props.id} changeTaskTitle={props.changeTaskTitle}
        changeStatus={props.changeStatus} removeTask={props.removeTask}/>
    })

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={() => {props.removeTodoList(props.id)}}>
                    <Delete/>
                </IconButton>
               {/* <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>x
                </button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:"none",paddingLeft:"0"}}>
                {tasks}
            </ul>
            <div>
                <Button variant={"contained"} size={'small'} color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={all}>All
                </Button>
                <Button variant={"contained"} color={props.filter === 'active' ? 'secondary' : 'primary'}
                        size={"small"} onClick={active}>Active
                </Button>
                <Button size={"small"} variant={"contained"} color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={completed}>Completed
                </Button>
            </div>
        </div>

    )
})
