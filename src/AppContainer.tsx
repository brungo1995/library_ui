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
// import { Switch, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Route, Switch } from 'react-router-dom';
import CategoryRouter from "./Views/Category/CategoryRouter"
import AuthorRouter from "./Views/Author/AuthorRouter"
import BookRouter from "./Views/Book/BookRouter"
import { MainDataProvider } from './context_providers/main_context';
import NotFound from "./Views/NotFound";

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
      <MainDataProvider>
        <Container className={classes.content}>
          <div className={classes.toolbar} />
          {/* <ContainerComponent /> */}
          <CssBaseline />
          <Container maxWidth="lg" className={classes2.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* ROUTER WILL COME HERE */}
                <Switch>
                  <Route path="/category" component={CategoryRouter} />
                  <Route path="/author" component={AuthorRouter} />
                  <Route path="/book" component={BookRouter} />
                  {/* <Route component={NotFound} /> */}
                </Switch>
                {/* <Tabs /> */}
              </Grid>
            </Grid>
          </Container>
        </Container>
      </MainDataProvider>
    </>
  )
}

export default hot(AppContainer)