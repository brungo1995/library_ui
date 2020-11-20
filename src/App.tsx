import { setConfig } from "react-hot-loader";
import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import * as Router from "react-router-dom";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Category from "./Views/Category/CategoryRouter"
import Container from '@material-ui/core/Container';
import LeftSideNav from "./components/LeftSideNav"
import { useStyles } from "./styles/styles"
import AppContainer from "./AppContainer"
// import { AlertProvider  } from './context_providers/alert_context';
import { AccountProvider, UserContext } from './context_providers/user_provider';
import SignUpView from "./Views/User/SignUp/SignUpView"
import LoginView from "./Views/User/Login/LoginView"
// if(!username){
//   return <Login />
// }


setConfig({
    reloadHooks: false,
});



function App() {
    const classes = useStyles();
    const User = React.useContext(UserContext);
    let token = User.getToken()
    const { user } = React.useContext(UserContext)


    if (token) {
        console.log(token)
    }

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
