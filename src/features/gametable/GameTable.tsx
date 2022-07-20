import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import {gameStyles} from "./gameStyles"
import {gameState, change_gt, change_pt, change_ph} from "./gameTableSlice"

import Header from "./Header"
import Aside from "./Aside"
import Player from "./Player"
import Footer from "./Footer"

function GameTable() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    // Hook
    function usePrevious<T>(value: T) {
        const ref = useRef<T>()
        useEffect(() => {
            ref.current = value
        }, [value])
        return ref.current
    }

    //React Hooks
    const prev_cur_ph = usePrevious(state.cur_ph)
    useEffect(() => {
        if (null != prev_cur_ph) {
            dispatch(change_ph([prev_cur_ph, state.cur_ph]))
        }
    }, [state.cur_ph])

    const prev_cur_pt = usePrevious(state.cur_pt)
    useEffect(() => {
        if (null != prev_cur_pt) {
            dispatch(change_pt([prev_cur_pt, state.cur_pt]))
        }
    }, [state.cur_pt])

    const prev_cur_gt = usePrevious(state.cur_gt)
    useEffect(() => {
        if (null != prev_cur_gt) {
            dispatch(change_gt([prev_cur_gt, state.cur_gt]))
        }
    }, [state.cur_gt])

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