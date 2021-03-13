import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    ChangeTodolistFilterActionAC, ChangeTodoListTitleActionAC,
    RemoveTodolistActionAC,
    todoListReducer
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppReducer() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    let todolist = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolist)

    const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "js", isDone: true},
            {id: v1(), title: "css", isDone: false},
            {id: v1(), title: "html", isDone: true},
            {id: v1(), title: "react", isDone: true}
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ]
    });

    function removeTask(taskID: string, todoListID: string) {
       /* const taskTodoList = tasks[todoListID]
        tasks[todoListID] = taskTodoList.filter(t => t.id !== taskID)*/
        //setTasks({...tasks})
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)

    }

    function addTask(taskTitle: string, todoListID: string) {
      /*  const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const taskTodoList = tasks[todoListID]
        tasks[todoListID] = [newTask, ...taskTodoList]*/
        dispatchToTasks(addTaskAC(taskTitle,todoListID))
        //setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        /*const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            //setTodoLists([...todoLists])

        }*/
        dispatchToTodoLists(ChangeTodolistFilterActionAC(todoListID,newFilterValue))
    }

    function removeTodoList(todoListID: string) {
      /* setTodoLists(todoLists.filter(tl => tl.id !== todoListID))*/
       delete tasks[todoListID]
        ///setTasks({...tasks})
        let action=RemoveTodolistActionAC(todoListID)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    function addTodoList(title: string) {
      /*  const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: 'all'
        }*/
        //setTodoLists([newTodoList, ...todoLists])
        //setTasks({...tasks, [newTodoListID]: []})
        let action=addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
       /* const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            //setTasks({...tasks})*/
            dispatchToTasks(changeTaskStatusAC(taskID,isDone,todoListID))
        }


    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        /*const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            //setTasks({...tasks})*/
        dispatchToTasks(changeTaskTitleAC(taskID,title,todoListID))

    }

    function changeTodoListTitle(title: string, todoListID: string) {
        /*const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            //setTodoLists([...todoLists])

        }*/
        let action=ChangeTodoListTitleActionAC(title,todoListID)
        dispatchToTodoLists(action)


    }

    const listTodos = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={12} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}/>
                </Paper>
            </Grid>

        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={4}>
                    {listTodos}
                </Grid>
            </Container>
        </div>
    );
}

export default AppReducer;
