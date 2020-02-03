/* Import statements */
import React from 'react';
import {Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';


import Home from './routes/home';
import Experiment from "./routes/experiment";

import makeStyles from "@material-ui/core/styles/makeStyles";
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import Icon from '@mdi/react';
// import {mdiHome} from '@mdi/js';
// import {mdiTestTube} from '@mdi/js';
import {Home as HomeIcon, TestTube} from 'mdi-material-ui';

// import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({

    iconButton: {
        margin: theme.spacing(1, 2, 1, 2),
        // border: "1px solid red",
    },
}));

/* App component */
function App() {

    // const styles = useStyles();

    return (
        <CssBaseline>

            <AppBar>
                <Toolbar>
                    <IconButton edge="start" aria-label="menu">
                        <HomeIcon color={"action"}/>
                    </IconButton>

                    <IconButton edge="start" aria-label="menu">
                        <TestTube />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Route path="/" exact component={Home}/>
            <Route path="/experiment" exact component={Experiment}/>

            <footer>
                This is a footer
            </footer>
        </CssBaseline>
    );
}

export default App;