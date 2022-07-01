import {useAppSelector, useAppDispatch} from "../../app/hooks";
import { makeStyles  } from "@mui/styles"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import { log } from "./gameTableSlice"
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
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#ffc",
    },
    aside: {
    },
    footer: {
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#ccc",
        padding: "16px",
    },
})

function GameTable() {

    const classes = useStyles()

    //React Redux Hooks
    // const todoList = useAppSelector(todoListStatus);
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
                <Typography>main0</Typography>
                <Typography>main1</Typography>
                <Typography>main2</Typography>
            </div>
            <div className={classes.footer}>
                <Typography>footer0</Typography>
                <Typography>footer1</Typography>
                <Typography>footer2</Typography>
            </div>
        </div>

    )

}

export default GameTable