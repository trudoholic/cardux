import {createTheme, ThemeProvider} from "@mui/material/styles"
import Button from "@mui/material/Button"
import React from "react"
import {blue, green, red, yellow} from "@mui/material/colors"
import {ICard} from "./utils";

const theme = createTheme({
    palette: {
        error: red,
        info: blue,
        success: green,
        warning: yellow,
    }
})

interface GameCardProps {
    card: ICard
    onClick: () => void
}

export default function GameCard(props: GameCardProps) {
    const card = props.card
    return (
        <ThemeProvider theme={theme}>
            <Button
                sx={{ m: 1/4 }}
                variant="outlined"
                color={card.type === 1 ? "error"
                    : card.type === 2 ? "success"
                        : card.type === 3 ? "primary"
                            : "secondary"}
                onClick={props.onClick}
            >
                {card.description}
            </Button>
        </ThemeProvider>
    );
}