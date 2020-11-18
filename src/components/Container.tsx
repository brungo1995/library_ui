import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import CategoryTabs from "./Tabs.old"
// import Tabs fro./Tabs.oldabs"
import CategoryRouter from "../Views/Category/CategoryRouter"
import { Route } from 'react-router-dom';
import { Category } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
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


export default function SimpleContainer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* ROUTER WILL COME HERE */}
                        <Route path="/category" component={CategoryRouter} />
                        <Route path="/author" component={Category} />
                        <Route path="/book" component={Category} />
                        {/* <Tabs /> */}
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}