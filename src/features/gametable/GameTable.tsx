import {useAppSelector, useAppDispatch} from "../../app/hooks";
import { makeStyles  } from "@mui/styles"

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { gameState, add, remove, log } from "./gameTableSlice"
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
        backgroundColor: "#ffc",
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
                    Add
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
                    {state.pp.map(p => (
                        <div key={p.id} className={classes.player}>
                            <h1>{p.id}</h1>
                            <div>
                                {p.zones.map(z => (
                                    <div key={z.id} className={classes.zone}>
                                        {/*<p>{z.id}</p>*/}
                                        <details>
                                            <summary>{z.id}</summary>
                                            {/*<p>Something small enough to escape casual notice</p>*/}

                                            {z.cards.map(card => (
                                                <div key={card.id}>
                                                    <p>{card.id}</p>
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
                    <Typography>spam</Typography>
                    <Typography>ham</Typography>
                    <Typography>eggs</Typography>
                </div>
            </div>
            <div className={classes.footer}>
                <Typography>Lorem</Typography>
                <Typography>ipsum</Typography>
            </div>
        </div>

    )

}

export default GameTable