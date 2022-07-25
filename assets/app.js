import * as React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import CustomersPage from "./Pages/CustomersPage";
import {HashRouter, Switch, Route} from "react-router-dom";

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';


const App = () => {
    return ( 
    <HashRouter>   
        <Navbar />
        <main className="container pt-5">
            <Switch>
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
    </HashRouter>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

