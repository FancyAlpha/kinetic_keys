import React from 'react';

import "./styles.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1,1,1,1),
        display: 'block'
    },
}));

function Experiment() {
    const classes = useStyles();

    return (
        <Grid container className="Main-content" spacing = {4}>
            <Grid item xs={12} sm={6}>
                <Card style = {{backgroundColor: 'rgb(247, 195, 195)' }}> 
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card style = {{backgroundColor: 'rgb(145, 115, 206)'}}> 
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card style = {{backgroundColor: 'rgb(154, 228, 203)'}}> 
                    <CardContent>
                        <Typography>
                            This is another item (Card)
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Experiment;