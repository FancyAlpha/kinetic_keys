import React from 'react';
// import logo from '../logo.svg';
import './Home.css';

import {makeStyles} from '@material-ui/core/styles';
import {Route, Link} from 'react-router-dom';
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
        <div className="App">
            <header className="App-header">
                <Typography variant="h1">Kinetic Keys</Typography>
                <Typography variant="subtitle1">Type words with your body!</Typography>
                <Button variant="contained"
                        color="secondary"
                        endIcon={<SendIcon/>}
                        className={classes.spaced}
                        component={Link}
                        to="/experiment">
                    Play the Game!
                </Button>
            </header>

            {/*<Route path="/"/>*/}
            <Route path="/experiment" component={Experiment}/>
        </div>
    );
}