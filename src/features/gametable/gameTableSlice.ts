import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import {getCard, getPlayers, ICard, IState} from "./Players"

const names = ['North','East','South','West']
const initialState: IState = {
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    pp: getPlayers(names)
}

const gameTableSlice = createSlice({
    name: "gameTable",
    initialState,
    reducers: {
        log(state, action: PayloadAction<string>) {
            const id = action.payload as keyof typeof state
            console.log("%c [card]", 'color: #ff00ff', id)
        },
        add(state, action: PayloadAction<string>) {
            const id = action.payload
            const cards = state.pp[0].zones[0].cards
            const card = getCard(id)
            cards.push(card)
            state.cards[id] = card
            state.sel_card = card
            console.log("%c [+]", 'color: #ff00ff', id, cards.length)
        },
        remove(state, action: PayloadAction<string>) {
            const cards = state.pp[0].zones[0].cards
            if (cards.length) {
                const card = cards.pop() as {id: string}
                state.sel_card = cards[cards.length - 1]
                console.log("%c [-]", 'color: #ff00ff', card.id, cards.length)
            }
            else {
                state.sel_card = null
            }
        },
        select(state, action: PayloadAction<string>) {
            const id = action.payload as keyof typeof state
            console.log("%c [card]", 'color: #ff00ff', id)
            state.sel_card = state.cards[id] ?? null
        },
    },
})

export const { add, remove, select, log } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
