import { setConfig } from "react-hot-loader";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import * as Router from "react-router-dom";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Category from "./Views/Category/CategoryRouter"
import Container from '@material-ui/core/Container';
import LeftSideNav from "./components/LeftSideNav"
import { useStyles } from "./styles/styles"
import AppContainer from "./AppContainer"
import { AlertProvider } from './context_providers/alert_context';
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

    if (true) {
        return <LoginView />
    }

    if (true) {
        return <SignUpView />
    }

    return (
        <Router>
            {/* ADD PROVIDER */}
            <AlertProvider>
                <Container className={classes.root}>
                    <Route path={"/"} component={LeftSideNav} />
                    <Route path={"/"} component={AppContainer} />
                </Container>
            </AlertProvider>
        </Router>
    );
}

export default App;
