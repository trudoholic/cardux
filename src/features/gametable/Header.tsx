import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, add, draw, play, remove, zone_lim} from "./gameTableSlice"
import config, {CommonZone} from "./config";
import {get_c_z} from "./Zones";

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
                    || !get_c_z(state, CommonZone.deck).length
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
                    dispatch(zone_lim('hand'))
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
                    dispatch(zone_lim('keep'))
                }}
            >
                KP L
            </Button>

        </div>
    )
}

export default Header