import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import config from "./config";
import {log_m, bra_gt, ket_gt, bra_pt, ket_pt, bra_ph, ket_ph} from "./Logger"
import {ICard, IState, IZone, initialState, getCard, getIdx} from "./Players"
import {get_deck, get_hand, get_keep} from "./Zones"

let cnt = 0
const N = config.players.length, move_token = true

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

function selectCard(state: IState) {
    if (is_phase(state, 'play')) {
        let hand = get_hand(state)
        if (hand.length) {
            state.sel_card = state.cards[hand[0].id]
            state.sel_card_valid = true
        }
    }
}

function is_phase(state: IState, phase_id: string) { return phase_id === config.phases[state.cur_ph] }

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
            // console.log("%c [card]", 'color: #d33682', id, state.sel_card?.player_id, state.sel_card?.zone_id)
        },

        begin(state) {
            let id = 120
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
            state.cur_ph = -1
            state.cur_pt = -1
            state.rnd_gt = -1
            state.cur_gt = -1
        },

        next(state) {
            state.cnt += 1
            log_m(`- ${config.phases[state.cur_ph]} : ${state.cnt} / ${config.ph_lim[state.cur_ph]}`)
            if (state.cnt < config.ph_lim[state.cur_ph]) return

            ket_ph(state.cur_ph)

            const next_ph = state.cur_ph + 1
            if (config.phases.length === next_ph) {

                const next_pt = (state.cur_pt + 1) % N
                ket_pt(state.cur_pt)

                if ((move_token ? state.cur_gt : 0) === next_pt) {
                    state.cur_gt = get_new_gt(state.cur_gt)
                }
                else {
                    state.cur_pt = next_pt
                }

            }
            else state.cur_ph = next_ph
        },

        change_gt(state, action: PayloadAction<[number, number]>) {
            const [cur_gt, next_gt] = action.payload
            if (cur_gt >= 0) ket_gt(cur_gt)

            let rnd_gt = -1
            if (! next_gt) {
                rnd_gt = state.rnd_gt += 1
            }

            if (next_gt >= 0) {
                bra_gt(next_gt, rnd_gt)
                state.cur_pt = move_token ? next_gt : 0
            }
        },

        change_pt(state, action: PayloadAction<[number, number]>) {
            const [cur_pt, next_pt] = action.payload
            if (next_pt >= 0) {
                bra_pt(next_pt)
                state.cur_ph = 0
            }
            else ket_pt(cur_pt)
        },

        change_ph(state, action: PayloadAction<[number, number]>) {
            const [cur_ph, next_ph] = action.payload
            if (next_ph >= 0) {
                bra_ph(next_ph)
                state.cnt = 0
                selectCard(state)
            }
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

                    if (is_phase(state, 'draw')) state.next_cnt += 1
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
                    selectCard(state)

                    if (is_phase(state, 'play')) state.next_cnt += 1
                }
            }
        },

    },
})

export const { add, begin, change_gt, change_pt, change_ph, draw, end, log, next, play, remove, select } = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
