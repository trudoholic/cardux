import {ICard, IState} from "./utils";
import config from "./config";

// Common: ['play','deck','drop']
// Player: ['hand','keep']

export function get_deck(state: IState): ICard[] {
    return state.common.zones[1].cards
}

export function get_drop(state: IState): ICard[] {
    return state.common.zones[2].cards
}

export function get_hand(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[0].cards
}

export function get_keep(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[1].cards
}

function is_phase(state: IState, phase_id: string) { return phase_id === config.phases[state.cur_ph] }
export function is_hand_empty(state: IState): boolean {
    // return is_phase(state, 'play') && !get_hand(state).length
    return (is_phase(state, 'play') || is_phase(state, 'hl')) && !get_hand(state).length
}

export function get_limits(state: IState): number[] {
    const RND = true, K = 3, L = 1
    return config.ph_lim.map((it, i) => it < 0 ? 0 : RND ? Math.floor(Math.random() * K) + L : it)
}
