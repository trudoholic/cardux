import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"

import {gameStyles} from "./gameStyles"
import {gameState, log, select} from "./gameTableSlice"
import config from "./config";

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
                {config.phases.map(phase => (
                    <div key={phase}>
                        <Button
                            sx={{ minWidth: "50%", m: 1/4 }}
                            variant="outlined"
                            color="primary"
                            // onClick={() => {
                            //     dispatch(select(card.id))
                            // }}
                        >
                            {phase}
                        </Button>
                    </div>
                ))}

            </div>
            }
        </div>
    )
}

export default Aside