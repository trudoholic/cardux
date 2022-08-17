import {createTheme, ThemeProvider} from "@mui/material/styles"
import Button from "@mui/material/Button"
import React from "react"
import {blue, green, grey, red, yellow} from "@mui/material/colors"
import {ICard} from "./utils";

const theme = createTheme({
    palette: {
        error: red,
        info: blue,
        success: green,
        warning: grey,
    }
})

interface GameCardProps {
    card: ICard
    onClick: () => void
}

const colors = ["error", "error", "warning", "success", "primary", "secondary"] as const

export default function GameCard(props: GameCardProps) {
    const card = props.card
    return (
        <ThemeProvider theme={theme}>
            <Button
                sx={{ m: 1/4 }}
                variant="outlined"
                color={colors[card.type]}
                onClick={props.onClick}
            >
                {card.description}
            </Button>
        </ThemeProvider>
    );
}