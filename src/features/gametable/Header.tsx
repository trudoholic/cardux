import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, add, draw, hand_lim, keep_lim, play, remove} from "./gameTableSlice"
import config from "./config";
import {get_deck} from "./Zones";

function Header() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    const classes = gameStyles()

    function is_phase(phase_id: string) { return phase_id === config.phases[state.cur_ph] }

    return (
        <div className={classes.header}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    dispatch(add(''))
                }}
            >
                ADD
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    dispatch(remove(''))
                }}
            >
                REM
            </Button>

            <Button
                disabled={
                    !state.game_on
                    || !is_phase('draw')
                    // || !state.common.zones[1].cards.length
                    || !get_deck(state).length
                }
                variant="contained"
                color="success"
                onClick={() => {
                    dispatch(draw(''))
                }}
            >
                DRAW
            </Button>

            <Button
                disabled={
                    !state.game_on
                    || !is_phase('play')
                    || !state.sel_card_valid
                }
                variant="contained"
                color="success"
                onClick={() => {
                    dispatch(play(''))
                }}
            >
                PLAY
            </Button>

            <Button
                disabled={
                    !state.game_on
                    || !is_phase('hl')
                    || !state.sel_card_valid
                }
                variant="contained"
                color="success"
                onClick={() => {
                    dispatch(hand_lim(''))
                }}
            >
                HD L
            </Button>

            <Button
                disabled={
                    !state.game_on
                    || !is_phase('kl')
                    || !state.sel_card_valid
                }
                variant="contained"
                color="success"
                onClick={() => {
                    dispatch(keep_lim(''))
                }}
            >
                KP L
            </Button>

        </div>
    )
}

export default Header