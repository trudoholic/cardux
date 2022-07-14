import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import {gameStyles} from "./gameStyles"
import {gameState, add, begin, change_gt, change_pt, end, log, next, remove, select} from "./gameTableSlice"
import Player from "./Player";

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
            </div>
            <div className={classes.main}>
                <div className={classes.game}>
                    <Player p={state.common} pi={NaN} />
                    {state.pp.map((p, pi) => (
                        <Player key={p.id} p={p} pi={pi} />
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
        </div>

    )

}

export default GameTable