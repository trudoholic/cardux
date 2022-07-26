import {ICard, IState} from "./utils";

// Common: ['play','deck','pile']
// Player: ['hand','keep']

export function get_deck(state: IState): ICard[] {
    return state.common.zones[1].cards
}

export function get_hand(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[0].cards
}

export function get_keep(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[1].cards
}
