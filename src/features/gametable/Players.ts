
export interface ICard {
    id: string
    description: string
    flag: boolean
}

export interface IState {
    cards: Record<string, ICard>
    sel_card: ICard | null
    sel_p: number
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

function getPlayer(id: string): IPlayer {
    return {
        id,
        zones: getZones(['hand','keep']),
    }
}

export function getPlayers(ids: string[]): IPlayer[] {
    const players: IPlayer[] = []
    let n = ids.length
    while (n --> 0) players.unshift(getPlayer(ids[n]))
    return players
}
