import {useAppSelector, useAppDispatch} from "../../app/hooks";
import { makeStyles  } from "@mui/styles"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { gameState, add, log, next, remove, select } from "./gameTableSlice"
import React from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#369",
    },
    header: {
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#ccc",
        padding: "16px",
    },
    main: {
        display: "flex",
        flexGrow: 1,
        // justifyContent: "center",
        // gap: "16px",
        // backgroundColor: "#ffc",
    },
    game: {
        display: "flex",
        flexGrow: 4,
        gap: "16px",
        backgroundColor: "#fff",
    },
    aside: {
        display: "flex",
        flexDirection: "column",
        flex: "0 0 320px",
        backgroundColor: "#999",
        padding: "16px",
    },
    footer: {
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#ccc",
        padding: "16px",
    },
    player: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "16px",
        backgroundColor: "#e8f5e9",
        border: "1px solid green",
    },
    zone: {
        // display: "flex",
        // flexDirection: "column",
        // flexGrow: 1,
        // gap: "16px",
        // backgroundColor: "#ffc",
        margin: "16px",
        border: "1px solid blue",
    },
})

let cnt = 0

function GameTable() {

    const classes = useStyles()

    //React Redux Hooks
    const state = useAppSelector(gameState);
    const dispatch = useAppDispatch();

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
                                color ={state.sel_p === pi ? "success" : "primary"}
                                onClick={() => {
                                    dispatch(log(p.id))
                                }}
                            >
                                {p.id}
                            </Button>
                            <div>
                                {p.zones.map(z => (
                                    <div key={z.id} className={classes.zone}>
                                        <details>
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
                        dispatch(log('NEW'))
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