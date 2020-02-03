/* Import statements */
import React from 'react';
import {Route, Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import {fade} from '@material-ui/core';

import AppBar from "@material-ui/core/AppBar";
// import {createMuiTheme} from '@material-ui/core/styles';
// import {ThemeProvider} from '@material-ui/core/styles';


import Home from './routes/home';
import Experiment from "./routes/experiment";

import makeStyles from "@material-ui/core/styles/makeStyles";

import {Home as HomeIcon, TestTube} from 'mdi-material-ui';
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },

        nav: {
            padding: theme.spacing(1, 0),
        },

        footer: {
            background: fade(theme.palette.grey.A200, 0.2),
            color: theme.palette.grey.A400,
            paddingTop: '8px',
            paddingBottom: '8px',
        },
    }))
;

/* App component */
function App() {

    const styles = useStyles();

    return (
        <CssBaseline>
            <div className={styles.root}>
                <Toolbar variant={"dense"} className={styles.nav}>
                    <Container>
                        <Link to={"/"}>
                            <IconButton edge="start" aria-label="menu">
                                <HomeIcon/>
                            </IconButton>
                        </Link>

                        <Link to={"/experiment"}>
                            <IconButton aria-label="menu">
                                <TestTube/>
                            </IconButton>
                        </Link>
                    </Container>
                </Toolbar>
                {/*</AppBar>*/}

                <Route path="/" exact component={Home}/>
                <Route path="/experiment" exact component={Experiment}/>

                <footer>
                    <Container className={styles.footer}>
                        <Typography variant={"caption"}>&copy; 2020 Kinetic Keys project by Mehul
                            Daruka, Mayank Daruka, and Pranav Rayudu.</Typography>
                    </Container>
                </footer>
            </div>
        </CssBaseline>
    );
}

export default App;