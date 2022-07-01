import {useAppSelector, useAppDispatch} from "../../app/hooks";
import { makeStyles  } from "@mui/styles"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { gameState, log } from "./gameTableSlice"
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import {removeTodo, setTodoStatus} from "../todo/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";


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
        flexGrow: 1,
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
        flexGrow: 1,
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#ffc",
        border: "1px solid green",
    },
})

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
                        dispatch(log('foo'))
                    }}
                >
                    Foo
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(log('bar'))
                    }}
                >
                    Bar
                </Button>
            </div>
            <div className={classes.main}>
                <div className={classes.game}>
                    {state.pp.map(p => (
                        <div className={classes.player}>
                            <h1 key={p.id}>{p.id}</h1>
                        </div>
                    ))}
                </div>
                <div className={classes.aside}>
                    <Typography>aside0</Typography>
                    <Typography>aside1</Typography>
                    <Typography>aside2</Typography>
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