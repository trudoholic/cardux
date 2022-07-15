import config from "./config";

export interface ICard {
    id: string
    description: string
    flag: boolean
    player_id: string
    zone_id: string
}

export interface IState {
    game_on: boolean
    cards: Record<string, ICard>
    sel_card: ICard | null
    sel_card_valid: boolean
    cur_gt: number
    rnd_gt: number
    cur_pt: number
    cur_ph: number
    common: IPlayer
    pp: IPlayer[]
}

export interface IZone {
    id: string
    cards: ICard[]
}

export interface IPlayer {
    id: string
    zones: IZone[]
}

export function getCard(id: string): ICard {
    return {
        id,
        description: 'Card: ' + id,
        flag: false,
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
        id,
        zones: getZones(config.common_zones),
    }
}

function getPlayer(id: string): IPlayer {
    return {
        id,
        zones: getZones(config.player_zones),
    }
}

export function getPlayers(ids: string[]): IPlayer[] {
    const players: IPlayer[] = []
    let n = ids.length
    while (n --> 0) players.unshift(getPlayer(ids[n]))
    return players
}
