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
      <Container className={classes.root}>
        <LeftSideNav />
        <Container className={classes.content}>
          <div className={classes.toolbar} />
          {/* ADD ROUTE HERE */}
          <ContainerComponent />
          {/* <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
        </Typography> */}
        </Container>


      </Container>
      {/* <App /> */}
    </>
  )
}

export default hot(AppContainer)