/* Solarized */
const BLUE    = '#268bd2'
const CYAN    = '#2aa198'
const GREEN   = '#859900'
const MAGENTA = '#d33682'
const ORANGE  = '#cb4b16'
const RED     = '#dc322f'
const VIOLET  = '#6c71c4'
const YELLOW  = '#b58900'

export function log_m(s: string) {
    // console.log("%c [>]", 'color: #ff00ff', s)
    console.log(`%c ${s}`, 'color:' + MAGENTA)
    // console.groupCollapsed('init cards');
}

export function bra_gt(gt: number) {
    console.group(`%c GT: `, 'color:' + GREEN, gt)
    console.log(`%c <gt ${gt}>`, 'color:' + GREEN)
}

export function ket_gt(gt: number) {
    console.log(`%c </gt ${gt}>`, 'color:' + GREEN)
    console.groupEnd();
}