import {v1} from 'uuid';
import {TodoListType} from "../AppReducer";
import {ActionType, todoListReducer} from "./tl-reducer";

let todolistId1:string
let todolistId2:string
let startState:Array<TodoListType>

beforeEach(()=>{
    let todolistId1=v1();
    let todolistId2=v1();
    startState=[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, { type: 'REMOVE-TODOLIST', todoListID:todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState===startState).toBeFalsy();

});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";


    const endState = todoListReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState===startState).toBeFalsy();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action:ActionType = {
        type: 'CHANGE-TITLE',
        todoListID:todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

