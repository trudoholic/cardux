export enum CommonZone {
    rule,
    goal,
    play,
    drop,
    deck,
}

export enum PlayerZone {
    hand,
    keep,
    crib,
}

export const enumToArray = (e:object) => Object.keys(e).filter(k => isNaN(+k))

const config = {
    foo: 'bar',
    players: ['North','East','South','West'],
    player_zones: enumToArray(PlayerZone),
    common_zones: enumToArray(CommonZone),
    phases: ['draw','play','hl','kl'],
    ph_lim: [2,1,-1,-1],
    phase_zone: ['','hand','hand','keep']
}

export default config