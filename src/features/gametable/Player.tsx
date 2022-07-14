import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"
import LocalPoliceIcon from "@mui/icons-material/LocalPolice"

import {gameStyles} from "./gameStyles"
import {gameState, log, select} from "./gameTableSlice"
import {IPlayer} from "./Players"

export interface IPlayerProps {
    p: IPlayer
    pi: number
}

function Player(props: IPlayerProps) {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    const classes = gameStyles()

    const p = props.p, pi = props.pi
    return (

        <div key={p.id} className={classes.player}>
            <Button
                variant="contained"
                color={isNaN(pi) ? "secondary" : state.cur_pt === pi ? "success" : "primary"}
                startIcon={state.cur_gt === pi && <LocalPoliceIcon />}
                onClick={() => {
                    dispatch(log(p.id))
                }}
            >
                {p.id}
            </Button>
            <div>
                {p.zones.map(z => (
                    <div key={z.id} className={classes.zone}>
                        <details open>
                            <summary>{z.id}</summary>
                            {z.cards.map(card => (
                                <div key={card.id}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            dispatch(select(card.id))
                                        }}
                                    >
                                        {card.id}
                                    </Button>
                                </div>
                            ))}

                        </details>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Player