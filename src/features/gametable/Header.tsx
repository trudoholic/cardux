import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, add, draw, play, remove} from "./gameTableSlice"
import config from "./config";

function Header() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    const classes = gameStyles()

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
                    || 'draw' !== config.phases[state.cur_ph]
                    || !state.common.zones[1].cards.length
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
                    || 'play' !== config.phases[state.cur_ph]
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
        </div>
    )
}

export default Header