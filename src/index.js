import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';

import Home from './routes/home';
import Experiment from "./routes/experiment";

import * as serviceWorker from './serviceWorker';

/** my starts code here **/
import {Route, HashRouter} from 'react-router-dom';

ReactDOM.render((
    <HashRouter>
        <Route path="/" component={Home}/>
        <Route path="/experiment" component={Experiment}/>
    </HashRouter>), document.getElementById('root'));
/** my code ends here **/

// ReactDOM.render(<Home/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
