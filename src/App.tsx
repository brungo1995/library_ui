import { setConfig } from "react-hot-loader";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import * as Router from "react-router-dom";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Category from "./Views/Category/CategoryRouter"

setConfig({
    reloadHooks: false,
});

function App() {

    return (
        <Router>
            <div id="wrapper">
                <Route path={"/"} component={SideNav} />
                <div id="page-wrapper" className="gray-bg">
                    <TopNav />
                    <Route path="/category" component={Category} />
                    <Route path="/author" component={Category} />
                    <Route path="/book" component={Category} />
                    {/* <h1>Hi from React! Welcome to !sada</h1> */}
                </div>
            </div>
        </Router>
    );
}

export default App;
