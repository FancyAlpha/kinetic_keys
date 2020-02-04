import React from 'react';
import '../styles/styles.css';

import {Route, Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';
import Experiment from "./experiment";

const useStyles = makeStyles(theme => ({
    spaced: {
        margin: theme.spacing(1),
    },
}));

export default function Home() {

    const classes = useStyles();

    return (
        <header className="App-content Main-content">
            <Typography variant="h1" component={"h1"}>Kinetic Keys</Typography>
            <Typography variant="subtitle1">Type words with your body!</Typography>
            <Button variant="contained"
                    color="secondary"
                    endIcon={<SendIcon/>}
                    className={classes.spaced}
                    component={Link}
                    to="/experiment">
                Play the Game!
            </Button>
            <Route path="/experiment" component={Experiment}/>
        </header>
    );
}