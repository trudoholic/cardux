import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"
// import Divider from "@mui/material/Divider"

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
            {config.phases.map((phase, i) => (
                <div key={phase}>
                    <Button
                        sx={{ minWidth: "50%", m: 1/4 }}
                        // variant="outlined"
                        variant={state.cur_ph === i ? "contained" : "outlined"}
                        color="primary"
                        // onClick={() => {
                        //     dispatch(select(card.id))
                        // }}
                    >
                        {
                            phase
                            + (state.cur_ph === i ? ` ${state.cnt + 1} / ` : ' ')
                            + (config.ph_lim[i] ?? '')
                        }
                    </Button>
                </div>
            ))}

            {/*<Divider sx={{borderBottomWidth: 2, width:'50%', m: 1}} />*/}

            {state.sel_card &&
                <Button
                    sx={{ width: 8, m: 1/4 }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        dispatch(log(state.sel_card?.id ?? ''))
                    }}
                >
                    {state.sel_card.id}
                </Button>
            }
        </div>
    )
}

export default Aside