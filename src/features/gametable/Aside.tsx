import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, log} from "./gameTableSlice"
import Typography from "@mui/material/Typography";

function Aside() {

    //React Redux Hooks
    const state = useAppSelector(gameState)
    const dispatch = useAppDispatch()

    const classes = gameStyles()

    return (
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
    )
}

export default Aside