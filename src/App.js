import React from 'react';
import './styles/styles.css';

import {Route, Link} from 'react-router-dom';

import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from '@material-ui/core';

import Home from './routes/home';
import Experiment from "./routes/experiment";

import {Home as HomeIcon, TestTube} from 'mdi-material-ui';

const useStyles = makeStyles(theme => ({
        navTitle: {
            margin: theme.spacing(0, 2),
            fontWeight: 'bold',
            color: theme.palette.grey.A700,
            flexGrow: 1,
        },

        navIcons: {
            zIndex: theme.zIndex.drawer + 2,


        },

        primaryHover: {
            '&:hover': {
                color: theme.palette.primary.dark,
            },
        },

        secondaryHover: {
            '&:hover': {
                color: theme.palette.secondary.dark,
            },
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
            <div className={"root"}>
                <Toolbar variant={"dense"}>

                    <Link to={"/"} className={styles.navIcons}>
                        <IconButton aria-label="menu" className={styles.primaryHover}>
                            <HomeIcon/>
                        </IconButton>
                    </Link>

                    <Link to={"/experiment"}>
                        <IconButton aria-label="menu" className={styles.secondaryHover}>
                            <TestTube/>
                        </IconButton>
                    </Link>

                    <Route path={"/experiment"} exact>
                        <Typography className={styles.navTitle} variant={"h6"}>
                            Kinetic Keys
                        </Typography>
                    </Route>
                </Toolbar>

                <Route path="/" exact component={Home}/>
                <Route path="/experiment" exact component={Experiment}/>

                <footer className={styles.footer}>
                    <Container>
                        <Typography variant={"caption"}>
                            &copy; 2020 Kinetic Keys project by Mehul
                            Daruka, Mayank Daruka, and Pranav Rayudu.
                        </Typography>
                    </Container>
                </footer>
            </div>
        </CssBaseline>
    );
}

export default App;