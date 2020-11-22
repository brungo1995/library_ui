import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
import { IAuthor } from "../../../Domain/Entities/Author";
import { NavLink, RouteComponentProps } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TabPanel from "../../../components/TabPanel";
import { useHistory, useParams } from "react-router-dom";
import useVM from "./AuthorEditVM";

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

function AuthorEditView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let author_id = params['author_id'];
    const isNewAuthor = author_id === "new";

    const { isLoading, item, loadAuthor, onCancel, handleInputChange, onSave, isPayloadValid } = useVM({
        author_id: author_id,
        history,
    });


    React.useEffect(() => {
        if (!isNewAuthor) {
            loadAuthor();
        }
    }, [author_id]);

    return (
        <TabPanel value={value} index={2}>
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
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="First Name"
                                name="first_name"
                                onChange={handleInputChange}
                                value={item.first_name || ""}
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-multiline-static"
                                label="Description"
                                name="last_name"
                                onChange={handleInputChange}
                                value={item.last_name || ""}
                                variant="outlined"
                            />

                        </Grid>
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
                                    onClick={onSave}
                                    disabled={isPayloadValid() ? false : true}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => onCancel()}
                                >
                                    Cancel
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            </Container>
        </TabPanel>
    )
}

export default AuthorEditView;