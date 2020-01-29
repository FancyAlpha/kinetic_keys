import React from 'react';
// import logo from '../logo.svg';
import './Home.css';
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <h2>Kinetic Keys</h2>
                <p>Type words with your body!</p>
                <Link to='/experiment'>Get started!</Link>
            </header>
        </div>
    );
}

export default Home;
