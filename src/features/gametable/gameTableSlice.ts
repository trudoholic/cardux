import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import {getCard, getPlayers, ICard, IState} from "./Players"

const names = ['North','East','South','West']
const initialState: IState = {
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    sel_gt: 0,
    sel_pt: 0,
    pp: getPlayers(names)
}

const gameTableSlice = createSlice({
    name: "gameTable",
    initialState,
    reducers: {
        log(state, action: PayloadAction<string>) {
            const id = action.payload //as keyof typeof state
            console.log("%c [>]", 'color: #ff00ff', id)
        },
        add(state, action: PayloadAction<string>) {
            const id = action.payload
            const cards = state.pp[state.sel_pt].zones[0].cards
            const card = getCard(id)
            cards.push(card)
            state.cards[id] = card
            state.sel_card = card
            console.log("%c [+]", 'color: #ff00ff', id, cards.length)
        },
        remove(state, action: PayloadAction<string>) {
            const cards = state.pp[state.sel_pt].zones[0].cards
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
            const id = action.payload
            console.log("%c [card]", 'color: #ff00ff', id)
            state.sel_card = state.cards[id] ?? null
        },
        next(state) {
            const N = 4, move_token = false
            let lim = move_token ? state.sel_gt : 0

            let pt = (state.sel_pt + 1) % N
            console.log("%c [pt]", 'color: #00ffff', state.sel_pt, '->', pt)
            if (pt === lim) {
                console.log("%c [pt round]", 'color: #ff00ff')

                let gt = state.sel_gt + 1
                console.log("%c [--gt--]", 'color: #ff00ff', state.sel_gt, '=>', gt)
                if (N === gt) {
                    console.log("%c [--gt round--]", 'color: #ff00ff')
                    gt = 0
                }
                state.sel_gt = gt

                pt = move_token ? gt : 0
            }
            state.sel_pt = pt
        },
    },
})

export const { add, log, next, remove, select } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
