import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "js", isDone: true},
            {id: v1(), title: "css", isDone: false},
            {id: v1(), title: "html", isDone: true},
            {id: v1(), title: "react", isDone: true},
        ],
        [todoListID2]: [{id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: false},]
    })


    function removeTask(taskID: string, todoListID: string) {
        const taskTodoList = tasks[todoListID]
        tasks[todoListID] = taskTodoList.filter(t => t.id !== taskID)
        setTasks({...tasks})

    }

    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const taskTodoList = tasks[todoListID]
        tasks[todoListID] = [newTask, ...taskTodoList]
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    /* let tasksForTodoList = tasks
     if (filter === 'active') {
         tasksForTodoList = tasks.filter(t => t.isDone === false)
     }
     if (filter === 'completed') {
         tasksForTodoList = tasks.filter(t => t.isDone === true)
     }
 */
    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    return (

        <div className="App">
            {
                todoLists.map(tl => {
                    let taskForTodoList = tasks[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <TodoList key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={taskForTodoList}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeStatus={changeStatus}
                                  filter={tl.filter}
                                  removeTodoList={removeTodoList}/>
                    )
                })
            }

        </div>
    );
}

export default App;
