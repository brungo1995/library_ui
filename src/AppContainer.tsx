import * as React from "react";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import App from "./App"
import Button from "@material-ui/core/Button";
import LeftSideNav from "./components/LeftSideNav"
// import "./styles/custom.css";
// import "./assets/css/style.css";


setConfig({
  reloadHooks: false,
});

function AppContainer() {


  return (
    <>
      <LeftSideNav />
      {/* <App /> */}
    </>
  )
}

export default hot(AppContainer)