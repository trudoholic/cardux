import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todosReducer from "../features/todo/todoSlice"
import gameTableReducer from "../features/gametable/gameTableSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todosReducer,
    gameTable: gameTableReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
