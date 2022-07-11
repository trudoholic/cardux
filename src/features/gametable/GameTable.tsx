import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector, useAppDispatch} from "../../app/hooks";

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'

import { gameState, add, begin, log, next, remove, select } from "./gameTableSlice"
import { gameStyles  } from "./gameStyles"

let cnt = 0

function GameTable() {

    //React Redux Hooks
    const state = useAppSelector(gameState);
    const dispatch = useAppDispatch();

    // Hook
    function usePrevious<T>(value: T) {
        const ref = useRef<T>()
        useEffect(() => {
            ref.current = value
        }, [value])
        return ref.current
    }

    //React Hooks
    const prev_sel_pt = usePrevious(state.sel_pt)
    useEffect(() => {
        // dispatch(log(`!!! ${prev_sel_pt} ---> ${state.sel_pt} !!!`))
        console.log("%c [pt]", 'color: #268bd2', prev_sel_pt, '->', state.sel_pt)
    }, [state.sel_pt])

    const classes = gameStyles()

    return (

        <div className={classes.root}>
            <div className={classes.header}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(add(++cnt + ''))
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
            </div>
            <div className={classes.main}>
                <div className={classes.game}>
                    {state.pp.map((p, pi) => (
                        <div key={p.id} className={classes.player}>
                            <Button
                                variant="contained"
                                color ={state.sel_pt === pi ? "success" : "primary"}
                                startIcon={state.sel_gt === pi && <LocalPoliceIcon />}
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
                    ))}
                </div>
                <div className={classes.aside}>
                    {state.sel_card ? <div>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    dispatch(log(state.sel_card?.id ?? ''))
                                }}
                            >
                                {state.sel_card.id}
                            </Button>
                        </div> : <div>
                            <Typography>spam</Typography>
                            <Typography>ham</Typography>
                            <Typography>eggs</Typography>
                        </div>
                    }
                </div>
            </div>
            <div className={classes.footer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(begin())
                    }}
                >
                    NEW
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        dispatch(next())
                    }}
                >
                    NEXT
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(log('END'))
                    }}
                >
                    END
                </Button>
            </div>
        </div>

    )

}

export default GameTable