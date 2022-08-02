import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import './bootstrap';
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import AuthContext from "./Contexts/AuthContext";
import CustomerPage from "./Pages/CustomerPage";
import CustomersPage from "./Pages/CustomersPage";
import HomePage from "./Pages/HomePage";
import InvoicePage from "./Pages/InvoicePage";
import InvoicesPage from "./Pages/InvoicesPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import authAPI from "./Services/authAPI";
import './styles/app.css';

authAPI.setup();

const App = () => {

    const [isAuth, setIsAuth] = React.useState(authAPI.isAuth());
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <PrivateRoute path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);