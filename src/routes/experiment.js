import React from 'react';

import "./styles.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function Experiment() {

    return (
        <Grid container className="Main-content">
            <Grid item xs={12} sm={6}>
                <Paper>
                This is a grid Item
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper>
                    This is a grid Item
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper>
                    This is a grid Item
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Experiment;
