import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../models/Todo";
import {RootState} from "../../app/store";
// import { v4 as uuidv4 } from "uuid";

let cnt = 0;
const uuidv4 = () => '#' + (++cnt);

const initialState = [] as Todo[];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.push(action.payload);
            },
            prepare: (description: string) => ({
                payload: {
                    id: uuidv4(),
                    description,
                    completed: false,
                } as Todo,
            }),
        },
        removeTodo(state, action: PayloadAction<string>) {
            const index = state.findIndex((todo) => todo.id === action.payload);
            state.splice(index, 1);
        },
        setTodoStatus(
            state,
            action: PayloadAction<{ completed: boolean; id: string }>
        ) {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
    },
});

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
export const todoListStatus = (state: RootState) => state.todo;
