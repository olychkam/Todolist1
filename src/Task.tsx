import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./AppRedux";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task: TaskType
    todolistId:string
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('task')

    const removeTask =useCallback( () => {
        props.removeTask(props.task.id, props.todolistId)
    },[])
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }
    return (
        <li
            className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color={"primary"} checked={props.task.isDone}
                      onChange={changeStatus}/>
            {/*<input type={'checkbox'}
                       checked={t.isDone}
                       onChange={changeStatus}/>
*/}
            <EditTableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
            {/*<button onClick={removeTask}>X</button>*/}

        </li>
    )
})