import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
import { ICategory } from "../../../Domain/Entities/Category";
import { findParams } from "../../../utilities/utilities";
import SearchBar from "../../../components/SearchBar";
import ListItemView from "../../../components/ListView";
import { NavLink, RouteComponentProps } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '50ch',
            },
        },
        button: {
            margin: theme.spacing(1),
        }

    }),
);

function CategoryEditView(): JSX.Element {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Grid container spacing={5}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    // justify="center"
                    // alignItems="center"
                    >
                        {/* <form className={classes.root} noValidate autoComplete="off"> */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Name"
                                defaultValue=""
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={6}
                                defaultValue=""
                                variant="outlined"
                            />

                        </Grid>
                        {/* </form> */}
                        <Grid item xs={6}>
                            <Grid container spacing={1}
                                justify="center"
                                alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
      </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={classes.button}
                                // startIcon={<DeleteIcon />}
                                >
                                    Cancel
      </Button>

                            </Grid>

                        </Grid>
                        {/* <Grid item xs={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
      </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
      </Button>
                        </Grid> */}

                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default CategoryEditView;