import cards, {getDescription} from "./cards"
import config from "./config"

type DeckCard = typeof cards[number]
export interface ICard extends DeckCard { //IDeckCard
    description: string
    player_id: string
    zone_id: string
}

/*export interface ICard {
    id: string
    description: string
    // flag: boolean
    player_id: string
    zone_id: string
}*/

export interface IState {
    game_on: boolean
    cards: Record<string, ICard>
    sel_card: ICard | null
    sel_card_valid: boolean
    cur_gt: number
    rnd_gt: number
    cur_pt: number
    cur_ph: number
    cnt: number
    next_cnt: number
    common: IPlayer
    pp: IPlayer[]
    ph_lim: number[]
}

export const initialState: IState = {
    game_on: false,
    cards: Object.create(null) as Record<string, ICard>,
    sel_card: null,
    sel_card_valid: false,
    cur_gt: -1,
    rnd_gt: -1,
    cur_pt: -1,
    cur_ph: -1,
    cnt: 0,
    next_cnt: 0,
    common: getCommon('Common'),
    pp: getPlayers(config.players),
    ph_lim: [],
}

export interface IZone {
    id: string
    cards: ICard[]
}

export interface IPlayer {
    id: string
    idx: number
    zones: IZone[]
}

/*export function getCard(id: string): ICard {
    return {
        id,
        description: 'Card: ' + id,
        // flag: false,
        player_id: '',
        zone_id: ''
    }
}*/

export function getDeckCard(id: number): ICard { //(deck_card: DeckCard): IDeckCard
    const deck_card = cards[id]
    return {
        ...deck_card,
        // description: 'Card: ' + deck_card.id,
        description: getDescription(id),
        player_id: '',
        zone_id: ''
    }
}

function getZone(id: string): IZone {
    return {
        id,
        cards: [],
    }
}

function getZones(ids: string[]): IZone[] {
    const zones: IZone[] = []
    let n = ids.length
    while (n --> 0) zones.unshift(getZone(ids[n]))
    return zones
}

export function getCommon(id: string): IPlayer {
    return {
        id, idx: -1,
        zones: getZones(config.common_zones),
    }
}

function getPlayer(id: string, idx: number): IPlayer {
    return {
        id, idx,
        zones: getZones(config.player_zones),
    }
}

export function getPlayers(ids: string[]): IPlayer[] {
    const players: IPlayer[] = []
    let n = ids.length
    while (n --> 0) players.unshift(getPlayer(ids[n], n))
    return players
}

export function getIdx(arr: string[]): Record<string, number> {
    const m: Record<string, number> = Object.create(null)
    arr.forEach((s, i) => m[s] = i)
    return m
}
