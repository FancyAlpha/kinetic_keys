import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import App from './App';

import * as serviceWorker from './serviceWorker';

/** my starts code here **/
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render((
    <Router>
        <Helmet>
            <title>Kinetic Keys</title>
        </Helmet>
        <App/>
    </Router>), document.getElementById('root'));
/** my code ends here **/

// ReactDOM.render(<Home/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
