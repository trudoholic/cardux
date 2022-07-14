import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import {log_m, bra_gt, ket_gt, bra_pt, ket_pt} from "./Logger"
import {getCard, getCommon, getPlayers, ICard, IState, IZone} from "./Players"

let cnt = 0
const N = 4, move_token = true
const names = ['North','East','South','West']

const initialState: IState = {
    game_on: false,
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    cur_gt: -1,
    rnd_gt: -1,
    cur_pt: -1,
    common: getCommon('Common'),
    pp: getPlayers(names)
}

const begin_game_turn = (gt: number) => {
    bra_gt(gt)
}

const end_game_turn = (gt: number) => {
    ket_gt(gt)
}

const get_new_gt = (gt: number) => {
    let new_gt = gt + 1
    if (N === new_gt) {
        new_gt = 0
    }
    return new_gt
}

function createCardInZone(state: IState, zone: IZone, id: number): ICard {
    const card = getCard('' + id)
    state.cards['' + id] = card
    zone.cards.push(card)
    card.zone_id = zone.id
    return card
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
            if (!state.game_on) return
            const card = createCardInZone(state, state.pp[state.cur_pt].zones[0], ++cnt)
            state.sel_card = card
            console.log("%c [+]", 'color: #d33682', card.id)
        },

        remove(state, action: PayloadAction<string>) {
            if (!state.game_on) return
            const cards = state.pp[state.cur_pt].zones[0].cards
            if (cards.length) {
                const card = cards.pop() as {id: string}
                state.sel_card = cards[cards.length - 1]
                console.log("%c [-]", 'color: #d33682', card.id, cards.length)
            }
            else {
                state.sel_card = null
            }
        },

        select(state, action: PayloadAction<string>) {
            const id = action.payload
            console.log("%c [card]", 'color: #d33682', id, !!state.cards[id])
            state.sel_card = state.cards[id] ?? null
        },

        begin(state) {
            let id = 5
            while (id --> 0) {
                createCardInZone(state, state.common.zones[1], id)
            }

            state.game_on = true
            state.cur_gt = 0
        },

        end(state) {
            state.common.zones.forEach(zone => zone.cards = [])
            state.pp.forEach(p => p.zones.forEach(zone => zone.cards = []))

            state.game_on = false
            state.cur_gt = -1
            state.rnd_gt = -1
            state.cur_pt = -1
        },

        next(state) {
            const next_pt = (state.cur_pt + 1) % N
            ket_pt(state.cur_pt)

            if ((move_token ? state.cur_gt : 0) === next_pt) {
                state.cur_gt = get_new_gt(state.cur_gt)
            }
            else {
                state.cur_pt = next_pt
            }
        },

        change_gt(state, action: PayloadAction<[number, number]>) {
            const [cur_gt, next_gt] = action.payload
            if (cur_gt >= 0) end_game_turn(cur_gt)

            if (! next_gt) {
                state.rnd_gt += 1
                console.log("%c [gt round]", 'color: #859900', state.rnd_gt) //GREEN
            }

            if (next_gt >= 0) begin_game_turn(next_gt)
            state.cur_pt = move_token ? next_gt : 0
        },

        change_pt(state, action: PayloadAction<[number, number]>) {
            const [cur_pt, next_pt] = action.payload
            if (next_pt >= 0) bra_pt(next_pt)
            else ket_pt(cur_pt)
        },

        draw(state, action: PayloadAction<string>) {
            const zone_src = state.common.zones[1]
            // const card = state.sel_card
            // if (card) {
            if (zone_src.cards.length) {
                const card = zone_src.cards.pop()
                // :: zone = card->zone
                // const zone = state.common.zones[1]
                // zone.cards = zone.cards.filter(c => c.id !== card.id)

                if (card) {
                    const zone_dst = state.pp[state.cur_pt].zones[0]
                    zone_dst.cards.push(card)
                    card.zone_id = zone_dst.id
                }
            }
        },

    },
})

export const { add, begin, change_gt, change_pt, draw, end, log, next, remove, select } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
