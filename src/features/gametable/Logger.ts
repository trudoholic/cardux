import config from "./config";

/* Solarized */
const BLUE    = '#268bd2'
const CYAN    = '#2aa198'
const GREEN   = '#859900'
const MAGENTA = '#d33682'
// const ORANGE  = '#cb4b16'
// const RED     = '#dc322f'
// const VIOLET  = '#6c71c4'
// const YELLOW  = '#b58900'

export function log_m(s: string) {
    console.log(`%c ${s}`, 'color:' + MAGENTA)
}

export function bra_gt(gt: number, rnd_gt: number) {
    if (rnd_gt >= 0) console.log("%c [gt round #]", 'color:' + GREEN, rnd_gt)
    console.group(`%c GT: `, 'color:' + GREEN, gt)
    // console.log(`%c <gt ${gt}>`, 'color:' + GREEN)
}

export function ket_gt(gt: number) {
    // console.log(`%c </gt ${gt}>`, 'color:' + GREEN)
    console.groupEnd()
}

export function bra_pt(pt: number) {
    console.group(`%c PT: `, 'color:' + BLUE, pt, config.players[pt])
    // console.groupCollapsed(`%c PT: `, 'color:' + BLUE, pt)
    console.log(`%c <pt ${pt}>`, 'color:' + BLUE)
}

export function ket_pt(pt: number) {
    console.log(`%c </pt ${pt}>`, 'color:' + BLUE)
    console.groupEnd()
}

export function bra_ph(ph: number, ph_lim: number) {
    console.group(`%c PH: `, 'color:' + CYAN, ph, config.phases[ph] ?? '-', ph_lim)
    // console.group(`%c PH: ${ph} ${config.phases[ph] ?? '-'}`, 'color:' + CYAN)
    // console.log(`%c <ph ${ph} ${config.phases[ph] ?? '-'}>`, 'color:' + CYAN)
}

export function ket_ph(ph: number) {
    // console.log(`%c </ph ${ph}>`, 'color:' + CYAN)
    console.groupEnd()
}
