import * as React from "react";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import App from "./App"
import Button from "@material-ui/core/Button";
import LeftSideNav from "./components/LeftSideNav"
import ContainerComponent from "./components/Container"
import Container from '@material-ui/core/Container';

import { useStyles } from "./styles/styles"
import { Typography } from "@material-ui/core";
// import "./styles/custom.css";
// import "./assets/css/style.css";


setConfig({
  reloadHooks: false,
});

function AppContainer() {
  const classes = useStyles();


  // if(!username){
  //   return <Login />
  // }


  return (
    <>
      {/* <Container className={classes.root}>
        <LeftSideNav /> */}
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        <ContainerComponent />

      </Container>


      {/* </Container> */}
      {/* <App /> */}
    </>
  )
}

export default hot(AppContainer)