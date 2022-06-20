import React from 'react'
// import { makeStyles, Theme, createStyles } from '@mui/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@mui/material/'

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(2)
//     }
// }))

export default function AltCard() {
    // const classes = useStyles()
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 },
        { quarter: 5, earnings: 13000 },
        { quarter: 6, earnings: 16500 },
        { quarter: 7, earnings: 14250 },
        // { quarter: 8, earnings: 19000 },
    ]
    return (
        // <div className={classes.root}>
        <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {data.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                title={`quarter : ${elem.quarter}`}
                                subheader={`earnings : ${elem.earnings}`}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Hello World
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}