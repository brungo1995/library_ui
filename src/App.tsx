import { setConfig } from "react-hot-loader";
import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import LeftSideNav from "./components/LeftSideNav"
import { useStyles } from "./styles/styles"
import AppContainer from "./AppContainer"
import { AccountProvider, UserContext } from './context_providers/user_provider';
import SignUpView from "./Views/User/SignUp/SignUpView"
import LoginView from "./Views/User/Login/LoginView";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./Views/NotFound"

setConfig({
    reloadHooks: false,
});



function App() {
    const classes = useStyles();
    const User = React.useContext(UserContext);
    let token = User.getToken()
    const { user } = React.useContext(UserContext)


    function PrivateRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    return token ? (
                        // return rest.username ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={`/signin`} />
                        );
                }}
            />
        );
    }

    return (
        <>
            <Router>
                <Container className={classes.root}>
                    <Route path={"/signin"} component={LoginView} />
                    <Route path={"/signup"} component={SignUpView} />

                    <PrivateRoute path="/" component={LeftSideNav} />
                    <PrivateRoute path="/" component={AppContainer} />
                </Container>
            </Router>
        </>
    );
}

export default App;
