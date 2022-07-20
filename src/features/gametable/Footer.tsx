import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, begin, end, next} from "./gameTableSlice"

function Footer() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    const classes = gameStyles()

    return (
        <div className={classes.footer}>
            <Button disabled={state.game_on}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(begin())
                    }}
            >
                NEW
            </Button>

            <Button disabled={!state.game_on}
                    variant="contained"
                    color="success"
                    onClick={() => {
                        dispatch(next())
                    }}
            >
                NEXT
            </Button>

            <Button disabled={!state.game_on}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(end())
                    }}
            >
                END
            </Button>
        </div>
    )
}

export default Footer