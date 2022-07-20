import { makeStyles  } from "@mui/styles"

export const gameStyles = makeStyles({
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
        backgroundColor: "#a5d6a7",
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
        backgroundColor: "#eee",
        padding: "16px",
    },
    footer: {
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        gap: "16px",
        backgroundColor: "#a5d6a7",
        padding: "16px",
    },
    player: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        // alignContent: "center",
        // alignItems: "center",
        gap: "16px",
        backgroundColor: "#e8f5e9",
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

