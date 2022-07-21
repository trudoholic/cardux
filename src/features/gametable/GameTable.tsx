import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector, useAppDispatch, useChange} from "../../app/hooks"

import {gameStyles} from "./gameStyles"
import {gameState, change_gt, change_pt, change_ph, log, next} from "./gameTableSlice"

import Header from "./Header"
import Aside from "./Aside"
import Player from "./Player"
import Footer from "./Footer"

function GameTable() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    //Hooks
    useChange(state.cur_ph, change_ph)
    useChange(state.cur_pt, change_pt)
    useChange(state.cur_gt, change_gt)
    useChange(state.next_cnt, next)

    const classes = gameStyles()

    return (

        <div className={classes.root}>
            <Header />
            <div className={classes.main}>
                <div className={classes.game}>
                    <Player p={state.common} pi={NaN} />
                    {state.pp.map((p, pi) => (
                        <Player key={p.id} p={p} pi={pi} />
                    ))}
                </div>
                <Aside />
            </div>
            <Footer />
        </div>

    )

}

export default GameTable