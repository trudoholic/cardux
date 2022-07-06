import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import { getCard, getPlayers } from "./Players"

const names = ['North','East','South','West']
const initialState = {
    foo: 0,
    bar: 1,
    pp: getPlayers(names)
}

const gameTableSlice = createSlice({
    name: "gameTable",
    initialState,
    reducers: {
        log(state, action: PayloadAction<string>) {
            const id = action.payload as keyof typeof state
            console.log("%c [>]", 'color: #ff00ff', id, state[id])
        },
        add(state, action: PayloadAction<string>) {
            const id = action.payload
            const cards = state.pp[0].zones[0].cards
            cards.push(getCard(id))
            console.log("%c [+]", 'color: #ff00ff', id, cards.length)
        },
    },
})

export const { add, log } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
