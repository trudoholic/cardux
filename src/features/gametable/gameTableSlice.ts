import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import {log_m, bra_gt, ket_gt} from "./Logger"
import {getCard, getPlayers, ICard, IState} from "./Players"

const names = ['North','East','South','West']
const initialState: IState = {
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    cur_gt: -1,
    rnd_gt: 0,
    cur_pt: 0,
    pp: getPlayers(names)
}

const begin_game_turn = (gt: number) => {
    bra_gt(gt)
}
const end_game_turn = (gt: number) => {
    ket_gt(gt)
    const N = 4
    let new_gt = gt + 1
    if (N === new_gt) {
        new_gt = 0
    }
    return new_gt
}
const get_new_gt = (gt: number) => {
    const N = 4
    let new_gt = gt + 1
    if (N === new_gt) {
        new_gt = 0
    }
    return new_gt
}

const gameTableSlice = createSlice({
    name: "gameTable",
    initialState,
    reducers: {
        log(state, action: PayloadAction<string>) {
            const id = action.payload //as keyof typeof state
            log_m(id)
        },
        add(state, action: PayloadAction<string>) {
            const id = action.payload
            const cards = state.pp[state.cur_pt].zones[0].cards
            const card = getCard(id)
            cards.push(card)
            state.cards[id] = card
            state.sel_card = card
            console.log("%c [+]", 'color: #ff00ff', id, cards.length)
        },
        remove(state, action: PayloadAction<string>) {
            const cards = state.pp[state.cur_pt].zones[0].cards
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
        begin(state) {
            state.cur_gt = 0
            state.rnd_gt = 0
            console.log("%c [gt round]", 'color: #859900', state.rnd_gt)
            begin_game_turn(0)
        },
        next(state) {
            const N = 4, move_token = false
            let lim = move_token ? state.cur_gt : 0

            let pt = (state.cur_pt + 1) % N
            console.log("%c [pt]", 'color: #dc322f', state.cur_pt, '->', pt) //red: ok

            if (pt === lim) {
                const new_gt = get_new_gt(state.cur_gt)
                end_game_turn(state.cur_gt)
                state.cur_gt = new_gt
                if (! new_gt) {
                    state.rnd_gt += 1
                    console.log("%c [gt round]", 'color: #859900', state.rnd_gt)
                }
                begin_game_turn(new_gt)

                pt = move_token ? get_new_gt(state.cur_gt) : 0
            }

            state.cur_pt = pt
        },
        change_gt(state, action: PayloadAction<[number, number]>) {
            const ids = action.payload
            console.log("%c [gt::ids]", 'color: #ff00ff', ids)

            // const N = 4, move_token = true
            // let lim = move_token ? state.cur_gt : 0

            // if (pt === lim) {
            //     const new_gt = end_game_turn(state.cur_gt)
            //     state.cur_gt = new_gt
            //     if (! new_gt) {
            //         state.rnd_gt += 1
            //         console.log("%c [gt round]", 'color: #859900', state.rnd_gt)
            //     }
            //     begin_game_turn(new_gt)
            //
            //     pt = move_token ? new_gt : 0
            // }
        },
        change_pt(state, action: PayloadAction<[number, number]>) {
            const ids = action.payload
            console.log("%c [pt::ids]", 'color: #ff00ff', ids)

            // const N = 4, move_token = true
            // let lim = move_token ? state.cur_gt : 0

            // if (pt === lim) {
            //     const new_gt = end_game_turn(state.cur_gt)
            //     state.cur_gt = new_gt
            //     if (! new_gt) {
            //         state.rnd_gt += 1
            //         console.log("%c [gt round]", 'color: #859900', state.rnd_gt)
            //     }
            //     begin_game_turn(new_gt)
            //
            //     pt = move_token ? new_gt : 0
            // }
        },
    },
})

export const { add, begin, change_gt, change_pt, log, next, remove, select } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
