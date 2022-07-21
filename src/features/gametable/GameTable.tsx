import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector, useAppDispatch} from "../../app/hooks"

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

    // Hook
    function usePrevious<T>(value: T) {
        const ref = useRef<T>()
        useEffect(() => {
            ref.current = value
        }, [value])
        return ref.current
    }

    //React Hooks
    const prev_ph = usePrevious(state.cur_ph)
    useEffect(() => {
        // dispatch(log(`Ph: ${prev_ph} -> ${state.cur_ph}`))
        if (null != prev_ph) {
            dispatch(change_ph([prev_ph, state.cur_ph]))
        }
    }, [state.cur_ph])

    const prev_pt = usePrevious(state.cur_pt)
    useEffect(() => {
        // dispatch(log(`PT: ${prev_pt} -> ${state.cur_pt}`))
        if (null != prev_pt) {
            dispatch(change_pt([prev_pt, state.cur_pt]))
        }
    }, [state.cur_pt])

    const prev_gt = usePrevious(state.cur_gt)
    useEffect(() => {
        // dispatch(log(`GT: ${prev_gt} -> ${state.cur_gt}`))
        if (null != prev_gt) {
            dispatch(change_gt([prev_gt, state.cur_gt]))
        }
    }, [state.cur_gt])

    const prev_cnt = usePrevious(state.cur_gt)
    useEffect(() => {
        // dispatch(log(`CNT: ${prev_cnt} -> ${state.next_cnt}`))
        if (null != prev_cnt) {
            dispatch(next())
        }
    }, [state.next_cnt])

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