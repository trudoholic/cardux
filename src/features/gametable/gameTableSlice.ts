import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState = {
    foo: 0,
    bar: 1,
    pp: [
        { id: 'N0' },
        { id: 'E1' },
        { id: 'S2' },
        { id: 'W3' },
    ]
}

const gameTableSlice = createSlice({
    name: "gameTable",
    initialState,
    reducers: {
        log(state, action: PayloadAction<string>) {
            const id = action.payload as keyof typeof state
            console.log("%c [>]", 'color: #ff00ff', id, state[id])
        },
    },
})

export const { log } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
