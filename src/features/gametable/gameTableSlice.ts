import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import config from "./config";
import {log_m, bra_gt, ket_gt, bra_pt, ket_pt, bra_ph, ket_ph} from "./Logger"
import {getCard, getCommon, getPlayers, ICard, IState, IZone} from "./Players"
import {get_deck, get_hand, get_keep} from "./Zones"

let cnt = 0
const N = config.players.length, move_token = true

const initialState: IState = {
    game_on: false,
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    sel_card_valid: false,
    cur_gt: -1,
    rnd_gt: -1,
    cur_pt: -1,
    cur_ph: -1,
    common: getCommon('Common'),
    pp: getPlayers(config.players)
}

const begin_game_turn = (gt: number, rnd_gt: number) => {
    bra_gt(gt, rnd_gt)
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
            state.sel_card = state.cards[id] ?? null
            state.sel_card_valid = state.sel_card
                && state.sel_card.player_id === 'p' + state.cur_pt
                && state.sel_card.zone_id === 'hand'
            console.log("%c [card]", 'color: #d33682', id, state.sel_card?.player_id, state.sel_card?.zone_id)
        },

        begin(state) {
            let id = 12
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

            let rnd_gt = -1
            if (! next_gt) {
                rnd_gt = state.rnd_gt += 1
            }

            if (next_gt >= 0) begin_game_turn(next_gt, rnd_gt)
            state.cur_pt = move_token ? next_gt : 0
        },

        change_pt(state, action: PayloadAction<[number, number]>) {
            const [cur_pt, next_pt] = action.payload
            if (next_pt >= 0) {
                bra_pt(next_pt)
                state.cur_ph = 0

                bra_ph(state.cur_ph)
            }
            else ket_pt(cur_pt)
        },

        draw(state, action: PayloadAction<string>) {
            const deck = get_deck(state)
            if (deck.length) {
                const card = deck.pop()
                if (card) {
                    const hand = get_hand(state)
                    hand.push(card)
                    state.cards[card.id].player_id = 'p' + state.cur_pt
                    state.cards[card.id].zone_id = 'hand'
                }
            }
        },

        play(state, action: PayloadAction<string>) {
            const card = state.sel_card
            if (card && 'hand' === card.zone_id) {
                let hand = get_hand(state)
                const idx = hand.findIndex(c => c.id === card.id)
                if (idx >= 0) {
                    hand.splice(idx, 1)
                    const keep = get_keep(state)
                    keep.push(card)
                    state.cards[card.id].zone_id = 'keep'
                    state.sel_card_valid = false
                }
            }
        },

    },
})

export const { add, begin, change_gt, change_pt, draw, end, log, next, play, remove, select } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
