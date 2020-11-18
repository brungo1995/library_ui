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


// if(!username){
//   return <Login />
// }


setConfig({
    reloadHooks: false,
});

function App() {
    const classes = useStyles();

    return (
        <Router>
            {/* ADD PROVIDER */}
            <Container className={classes.root}>
                <Route path={"/"} component={LeftSideNav} />
                <Route path={"/"} component={AppContainer} />
            </Container>
        </Router>
    );
}

export default App;
