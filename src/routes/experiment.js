import React from 'react';
import "../styles/styles.css";

import Card from '@material-ui/core/Card';
import {CardContent, Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


import makeStyles from "@material-ui/core/styles/makeStyles";

import {grey} from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({

    bodyContainer: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "60% 1fr",

        gridGap: theme.spacing(2),
        padding: theme.spacing(2),
        placeContent: "stretch",
    },

    letterSection: {
        gridColumn: "1 / span 1",
        gridRow: "1 / span 1",

        display: 'grid',
        gridTemplate: "1fr 30px / 100%",
    },

    letterPredictionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        lineHeight: 0,
    },

    letterPrediction: {
        fontSize: '12em',
    },

    letterPredictionDescription: {
        color: grey[500],
    },

    cameraSection: {
        gridColumn: "2 / span 1",
        gridRow: "1 / span 1",

        background: grey["900"],
    },

    wordSection: {
        gridColumn: "1 / span 2",
        gridRow: "2 / span 1",

        display: 'grid',
        gridTemplate: "30px 1fr / 100%",
    },

    wordPrediction: {
        fontSize: '7em',
    }
}));

function Experiment() {
    const styles = useStyles();

    return (
        <Container maxWidth={"md"} className={[styles.bodyContainer, "Main-content"].join(" ")}>
            <Card className={styles.letterSection} raised>

                <CardContent className={styles.letterPredictionWrapper}>
                    <Box
                        className={styles.letterPrediction}
                        fontWeight={"fontWeightBold"}
                        textAlign={"center"}
                    >
                        B
                    </Box>
                </CardContent>

                <Typography variant={"subtitle2"}
                            align={"center"}
                            className={styles.letterPredictionDescription}>
                    Prediction
                </Typography>

            </Card>
            <Card className={styles.cameraSection}>

                <CardContent>
                    {/* Camera goes here */}
                </CardContent>
            </Card>

            <Card className={styles.wordSection}>

                <Typography
                    variant={"subtitle2"}
                    align={"center"}
                    className={styles.letterPredictionDescription}
                    style={{marginTop: "auto"}}
                >
                    Try to spell this word out with your body!
                </Typography>

                <CardContent>
                    <Box
                        className={styles.wordPrediction}
                        fontWeight={"fontWeightBold"}
                        textAlign={"center"}>
                        BOX {/* Make this all capitalized */}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Experiment;