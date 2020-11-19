import * as React from "react";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useStyles } from "../../../styles/styles"
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useVM from './SignUpVM'
import { useHistory, useParams } from "react-router-dom";


const useStyles1 = makeStyles((theme: Theme) =>
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
    const classes1 = useStyles1();
    const history = useHistory();
    const params = useParams();

    const { isLoading,
        item,
        onCancel,
        handleInputChange,
        onSignUp,
        isValidUser } = useVM({ history });

    // if(!username){
    //   return <Login />
    // }


    return (
        <>
            <Container className={classes.root}>
                <Container className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <Typography paragraph style={{ fontSize: "30px" }}>Sign Up</Typography>
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <TextField
                                    style={{ width: "300px" }}
                                    required
                                    id="outlined-required"
                                    label="Full Name"
                                    name="name"
                                    onChange={handleInputChange}
                                    // defaultValue=""
                                    // value={item.name || ""}
                                    variant="outlined"
                                />
                            </Grid>
                            {/* user full name, a username, a password , email*/}
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <TextField
                                    style={{ width: "300px" }}
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    name="username"
                                    onChange={handleInputChange}
                                    // defaultValue=""
                                    // value={item.name || ""}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <TextField
                                    style={{ width: "300px" }}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={handleInputChange}
                                    // defaultValue=""
                                    // value={item.name || ""}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                <TextField
                                    style={{ width: "300px" }}
                                    id="outlined-password-input"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={handleInputChange}
                                    autoComplete="current-password"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                {/* <Paper className={classes1.paper}>xs=6 sm=3</Paper> */}
                                <Button
                                    disabled={!isValidUser()}
                                    style={{ margin: "10px 70px 10px 10px" }}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={onSignUp}
                                // className={classes.button}
                                // startIcon={<EditIcon />}
                                >Sign Up
                            </Button>
                                <Button
                                    style={{ margin: "10px" }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                // onClick={onDelete}
                                // className={classes.button}
                                // startIcon={<DeleteIcon />}
                                >
                                    Cancel
                            </Button>
                            </Grid>
                            {/* <Grid item xs={6} sm={3}>
                                <Paper className={classes1.paper}>xs=6 sm=3</Paper>
                            </Grid> */}
                            {/* <Grid item xs={6} sm={3}>
                                <Paper className={classes1.paper}>xs=6 sm=3</Paper>
                            </Grid> */}
                            {/* <Grid item xs={6} sm={3}>
                                <Paper className={classes1.paper}>xs=6 sm=3</Paper>
                            </Grid> */}
                        </Grid>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default hot(AppContainer)