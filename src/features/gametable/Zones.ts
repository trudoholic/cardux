import {ICard, IState} from "./utils"
import config, {CommonZone, PlayerZone} from "./config"
import {RuleType} from "./cards"

export function get_deck(state: IState): ICard[] {
    return state.common.zones[CommonZone.deck].cards
}

export function get_drop(state: IState): ICard[] {
    return state.common.zones[CommonZone.drop].cards
}

export function get_rule(state: IState): ICard[] {
    return state.common.zones[CommonZone.rule].cards
}

export function get_goal(state: IState): ICard[] {
    return state.common.zones[CommonZone.goal].cards
}

export function get_hand(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[PlayerZone.hand].cards
}

export function get_crib(state: IState): ICard[] {
    return state.pp[state.cur_pt].zones[PlayerZone.crib].cards
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
    const RND = false, K = 3, L = 1
    const rules = get_rule(state)
    const LMS0 = [RuleType.Draw, RuleType.Play, RuleType.HLim, RuleType.KLim]
        .map((ruleType, i) => rules.find(it => ruleType === it.subtype)?.value)
    const LMS = config.ph_lim.map((it, i) =>
        // LMS0[i] ?? (it < 0 ? 0 : RND ? Math.floor(Math.random() * K) + L : it)
        LMS0[i] ?? (RND ? Math.floor(Math.random() * K) + L : it)
    )
    const hand_length = get_hand(state).length
    LMS[2] = (LMS[2] < 0 || hand_length < LMS[2]) ? 0 : hand_length - LMS[2]
    const keep_length = get_keep(state).length
    LMS[3] = (LMS[3] < 0 || keep_length < LMS[3]) ? 0 : keep_length - LMS[3]

    console.log("%c [-----------]", 'color: #ff00ff', LMS0)
    console.log("%c [===========]", 'color: #ff00ff', state.cur_pt, ':', hand_length, keep_length)
    console.log("%c [on start pt]", 'color: #ff00ff', LMS)
    return LMS
}
