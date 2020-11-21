import * as React from "react";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import App from "./App"
import Button from "@material-ui/core/Button";
import LeftSideNav from "./components/LeftSideNav"
// import ContainerComponent from "./components/Container"
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useStyles } from "./styles/styles"
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Route } from 'react-router-dom';
import CategoryRouter from "./Views/Category/CategoryRouter"
import AuthorRouter from "./Views/Author/AuthorRouter"

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

setConfig({
  reloadHooks: false,
});

function AppContainer() {
  const classes = useStyles();
  const classes2 = useStyles2();



  return (
    <>
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        {/* <ContainerComponent /> */}
        <CssBaseline />
        <Container maxWidth="lg" className={classes2.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* ROUTER WILL COME HERE */}
              <Route path="/category" component={CategoryRouter} />
              <Route path="/author" component={AuthorRouter} />
              <Route path="/book" component={CategoryRouter} />
              {/* <Tabs /> */}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  )
}

export default hot(AppContainer)