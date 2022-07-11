export function log_m(s: string) {
    // console.log("%c [>]", 'color: #ff00ff', s)
    console.log(`%c ${s}`, 'color: #ff00ff')
    // console.groupCollapsed('init cards');
}

export function bra_gt(gt: number) {
    console.group(`%c GT: `, 'color: #859900', gt)
    console.log(`%c <gt ${gt}>`, 'color: #859900')
}

export function ket_gt(gt: number) {
    console.log(`%c </gt ${gt}>`, 'color: #859900')
    console.groupEnd();
}