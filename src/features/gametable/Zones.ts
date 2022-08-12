import {ICard, IState} from "./utils"
import config, {CommonZone, PlayerZone} from "./config"

export function get_deck(state: IState): ICard[] {
    return state.common.zones[CommonZone.deck].cards
}

export function get_drop(state: IState): ICard[] {
    return state.common.zones[CommonZone.drop].cards
}

export function get_rule(state: IState): ICard[] {
    return state.common.zones[CommonZone.rule].cards
}

export function get_hand(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[PlayerZone.hand].cards
}

export function get_keep(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[PlayerZone.keep].cards
}

export function get_src(state: IState): ICard[] {
    const idx = config.player_zones.findIndex(it => it === config.phase_zone[state.cur_ph])
    if (idx >= 0) {
        return state.pp[state.cur_pt].zones[idx].cards
    }
    return []
}

export function is_src_empty(state: IState): boolean {
    return state.cur_ph ? !get_src(state).length : false
}

export function get_limits(state: IState): number[] {
    const RND = true, K = 3, L = 1
    return config.ph_lim.map((it, i) => it < 0 ? 0 : RND ? Math.floor(Math.random() * K) + L : it)
}
