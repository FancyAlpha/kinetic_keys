import React from 'react';
import "../styles/styles.css";

import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    },

    cameraSection: {
        gridColumn: "2 / span 1",
        gridRow: "1 / span 1",
    },

    wordSection: {
        gridColumn: "1 / span 2",
        gridRow: "2 / span 1",
    }
}));

function Experiment() {
    const classes = useStyles();

    return (
        <div className={[classes.bodyContainer, "Main-content"].join(" ")}>
            <Card className={classes.letterSection}>
                {/*<Card>*/}
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                {/*</Card>*/}
            </Card>
            <Card className={classes.cameraSection}>
                {/*<Card>*/}
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                {/*</Card>*/}
            </Card>

            <Card className={classes.wordSection}>
                {/*<Card>*/}
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                {/*</Card>*/}
            </Card>
        </div>
    );
}

export default Experiment;