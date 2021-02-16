import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";

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

export function TodoList(props: TodoListPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const all = () => {
        props.changeFilter('all', props.id)
    }
    const active = () => {
        props.changeFilter('active', props.id)
    }
    const completed = () => {
        props.changeFilter('completed', props.id)
    }
    const changeTodoListTitle=(title:string)=>{
        props.changeTodoListTitle(title,props.id)
    }


    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return (
            <li key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <Checkbox color={"primary"} checked={t.isDone}
                          onChange={changeStatus}/>
                {/*<input type={'checkbox'}
                       checked={t.isDone}
                       onChange={changeStatus}/>
*/}
                <EditTableSpan title={t.title} changeItem={changeTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTask}>X</button>*/}

            </li>
        )
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
}
