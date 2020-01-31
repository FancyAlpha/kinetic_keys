/* Import statements */
import React from 'react';
import {Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './routes/home';
import Experiment from "./routes/experiment";

/* App component */
function App() {
    return (
        <CssBaseline>
            <nav>
                Naigation bar
            </nav>

            <Route path="/" exact component={Home}/>
            <Route path="/experiment" exact component={Experiment}/>

            <footer>
                This is a footer
            </footer>
        </CssBaseline>
    );
}

export default App;