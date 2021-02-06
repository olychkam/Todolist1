import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

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
}

export function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError('Error')
        }
        setTitle('')
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

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }

        return (
            <li key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <input type={'checkbox'}
                       checked={t.isDone}
                       onChange={changeStatus}
                       onBlur={() => {
                           setError(null)
                       }}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>

            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>x
                </button>
            </h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressTask}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={all}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={active}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={completed}>Completed
                </button>
            </div>
        </div>

    )
}