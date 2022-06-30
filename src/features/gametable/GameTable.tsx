import {useAppSelector, useAppDispatch} from "../../app/hooks";

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"

import { log } from "./gameTableSlice"

function GameTable() {

    //React Redux Hooks
    // const todoList = useAppSelector(todoListStatus);
    const dispatch = useAppDispatch();

    return (

        <Container maxWidth="xs">

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

        </Container>

    )

}

export default GameTable