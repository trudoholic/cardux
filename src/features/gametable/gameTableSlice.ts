import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

import cards, {CardType} from "./cards"
import config, {CommonZone, PlayerZone} from "./config"
import {log_m, bra_gt, ket_gt, bra_pt, ket_pt, bra_ph, ket_ph} from "./Logger"
import {ICard, IState, IZone, initialState, getDeckCard} from "./utils"
import {
    card_zone,
    get_c_z,
    get_p_z,
    get_limits,
    get_src,
    is_src_empty
} from "./Zones"

const N = config.players.length, move_token = true
// const n_cards = 12

let card_uid = 0
let src_empty = false
let deck_over = false

const get_new_gt = (gt: number) => {
    let new_gt = gt + 1
    if (N === new_gt) {
        new_gt = 0
    }
    return new_gt
}

function createCardInZone(state: IState, zone: IZone, id: number): ICard {
    // const card = getCard('' + id)
    const card = getDeckCard(id)
    state.cards['' + id] = card
    zone.cards.push(card)
    card.zone_id = zone.id
    return card
}

function selectCard(state: IState) {
    if (state.cur_ph) {
        let src = get_src(state)
        if (src.length) {
            state.sel_card = state.cards[src[0].id]
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
            /*/
            enum RGB { Red = 1, Green, Blue,}
            const xyz = RGB
            const rgb_list = Object.keys(xyz).filter(k => isNaN(+k))//.length
            console.log("%c [+]", 'color: #d33682', rgb_list)
            /*/
            if (!state.game_on) return
            const card = createCardInZone(state, state.pp[state.cur_pt].zones[PlayerZone.hand], ++card_uid)
            card.player_idx = state.cur_pt
            state.sel_card = card
            console.log("%c [+]", 'color: #d33682', card.id)
            //
        },

        remove(state, action: PayloadAction<string>) {
            if (!state.game_on) return
            const cards = get_p_z(state, PlayerZone.hand)
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
                // && state.sel_card.player_id === 'p' + state.cur_pt
                && state.sel_card.player_idx === state.cur_pt
                && state.sel_card.zone_id === config.phase_zone[state.cur_ph]
            // console.log("%c [card]", 'color: #d33682', id, state.sel_card?.player_id, state.sel_card?.zone_id)
        },

        begin(state) {
            const src = Array.from(Array(cards.length), (_,i) => i)
            const dst = []
            while (src.length) {
                // dst.push(src.shift())
                dst.push(src.splice(Math.floor(Math.random() * src.length), 1)[0])
            }
            // console.log("%c [dst]", 'color: #d33682', dst.length, dst)

            // let id = n_cards
            let id = cards.length
            while (id --> 0) {
                createCardInZone(state, state.common.zones[CommonZone.deck], dst[id]!)
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
            state.sel_card = null
            state.ph_lim = []
            deck_over = false
        },

        next(state) {
            const b_skip = (state.ph_lim[state.cur_ph] <= 0)
            if (!b_skip && !src_empty) {
                state.cnt += 1
                log_m(`- ${config.phases[state.cur_ph]} : ${state.cnt} / ${state.ph_lim[state.cur_ph]}`)

                if (state.cnt < state.ph_lim[state.cur_ph]) {
                    if (is_src_empty(state)) log_m('- src empty')
                    else return // (next imp)
                }
            }

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
                // log_m('=== on start pt ===')
                state.cur_ph = 0
            }
            else ket_pt(cur_pt)
        },

        change_ph(state, action: PayloadAction<[number, number]>) {
            const [cur_ph, next_ph] = action.payload
            if (next_ph >= 0) {
                state.ph_lim = [...get_limits(state)]
                bra_ph(next_ph, state.ph_lim[next_ph])
                state.cnt = 0
                selectCard(state)

                src_empty = is_src_empty(state)

                if (0 >= state.ph_lim[next_ph]) {
                    log_m('- skip')
                    state.next_cnt += 1
                }

                else if (src_empty) {
                    log_m('-- src empty')
                    state.next_cnt += 1
                }
            }
        },

        draw(state, action: PayloadAction<string>) {
            const deck = get_c_z(state, CommonZone.deck)
            if (deck.length) {
                let card: ICard | undefined
                if (state.sel_card && 'deck' === state.sel_card.zone_id) {
                    card = state.sel_card
                    const idx = deck.findIndex(c => c.id === card!.id)
                    if (idx >= 0) {
                        deck.splice(idx, 1)
                    }
                }
                else {
                    card = deck.shift()
                }

                if (!deck.length) {
                    const drop = get_c_z(state, CommonZone.drop)
                    if (drop.length) {
                        log_m('-- shuffle --')
                        const tmp = state.common.zones[CommonZone.drop].cards.splice(0, drop.length)
                        // state.common.zones[CommonZone.deck].cards = tmp // no shuffle
                        while (tmp.length) {
                            state.common.zones[CommonZone.deck].cards
                                .push(tmp.splice(Math.floor(Math.random() * tmp.length), 1)[0])
                        }

                    }
                    else {
                        log_m('! deck over')
                        deck_over = true
                    }
                }

                if (card) {
                    const c = state.cards[card.id]
                    if (CardType.Bane === card.type) {
                    // if (CardType.Keep !== card.type) {
                        const crib = get_p_z(state, PlayerZone.crib)
                        crib.push(card)
                        c.player_idx = state.cur_pt
                        c.zone_id = PlayerZone[PlayerZone.crib]
                    }
                    else {
                        const hand = get_p_z(state, PlayerZone.hand)
                        hand.push(card)
                        c.player_idx = state.cur_pt
                        c.zone_id = PlayerZone[PlayerZone.hand]

                        if (is_phase(state, 'draw')) state.next_cnt += 1
                    }
                }
            }
            else {
                log_m('-- deck over')
                state.next_cnt += 1
            }
        },

        play(state, action: PayloadAction<string>) {
            const card = state.sel_card
            if (card && PlayerZone[PlayerZone.hand] === card.zone_id) {
                let hand = get_p_z(state, PlayerZone.hand)
                const idx = hand.findIndex(c => c.id === card.id)
                if (idx >= 0) {
                    hand.splice(idx, 1)

                    if (CardType.Rule === card.type) {
                        const drop = get_c_z(state, CommonZone.rule).filter(it => it.subtype === card.subtype)
                        drop.forEach(it => {
                            it.zone_id = CommonZone[CommonZone.drop]
                            get_c_z(state, CommonZone.drop).push(it)
                        })
                        state.common.zones[CommonZone.rule].cards = get_c_z(state, CommonZone.rule).filter(it => it.subtype !== card.subtype)

                        get_c_z(state, CommonZone.rule).push(card)
                        state.cards[card.id].zone_id = CommonZone[CommonZone.rule]
                    }
                    else if (CardType.Goal === card.type) {
                        const drop = get_c_z(state, CommonZone.goal).splice(0)
                        drop.forEach(it => {
                            it.zone_id = CommonZone[CommonZone.drop]
                            get_c_z(state, CommonZone.drop).push(it)
                        })
                        get_c_z(state, CommonZone.goal).push(card)
                    }
                    else {
                        get_p_z(state, PlayerZone.keep).push(card)
                        state.cards[card.id].zone_id = PlayerZone[PlayerZone.keep]
                    }

                    state.sel_card_valid = false
                    selectCard(state)

                    if (is_phase(state, 'play')) state.next_cnt += 1
                }
            }
        },

        zone_lim(state, action: PayloadAction<string>) {
            const id = action.payload
            const card = state.sel_card
            if (card && id === card.zone_id) {
                let src = get_src(state)
                const idx = src.findIndex(c => c.id === card.id)
                if (idx >= 0) {
                    src.splice(idx, 1)
                    const dst = get_c_z(state, CommonZone.drop)
                    dst.push(card)
                    state.cards[card.id].zone_id = CommonZone[CommonZone.drop]
                    state.sel_card_valid = false
                    selectCard(state)
                    state.next_cnt += 1
                }
            }
        },

    },
})

export const {
    add, begin, change_gt, change_pt, change_ph, draw,
    end, log, next, play, remove, select, zone_lim
} = gameTableSlice.actions
export const gameState = (state: RootState) => state.gameTable
export default gameTableSlice.reducer
