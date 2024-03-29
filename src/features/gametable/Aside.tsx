import React from "react"
import {useAppSelector, useAppDispatch} from "../../app/hooks"

import Button from "@mui/material/Button"
// import Divider from "@mui/material/Divider"

import {gameStyles} from "./gameStyles"
import {gameState, log, select} from "./gameTableSlice"
import config from "./config";
import GameCard from "./GameCard";

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
                        disabled={state.ph_lim[i] <= 0}
                        variant={state.cur_ph === i ? "contained" : "outlined"}
                        color="primary"
                    >
                        {
                            phase
                            + (state.cur_ph === i ? ` ${state.cnt + 1} / ` : ' ')
                            + (state.ph_lim[i] ?? '')
                        }
                    </Button>
                </div>
            ))}

            {/*<Divider sx={{borderBottomWidth: 2, width:'50%', m: 1}} />*/}

            {state.sel_card &&
                <GameCard
                    card={state.sel_card}
                    onClick={() => {dispatch(log(state.sel_card?.description ?? ''))}}
                />
            }
        </div>
    )
}

export default Aside