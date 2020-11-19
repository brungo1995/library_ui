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
import TabPanel from "../../../components/TabPanel";
import { useHistory, useParams } from "react-router-dom";
import useVM from "./CategoryEditVM";

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

function CategoryEditView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let category_id = params['category_id'];
    const isNewCategory = category_id === "new";

    const { isLoading, item, CategoryValidationSchema, loadCategory, onCancel, handleInputChange, onSave } = useVM({
        category_id: category_id,
        history,
    });


    React.useEffect(() => {
        if (!isNewCategory) {
            loadCategory();
        }
    }, [category_id]);

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
                                label="Name"
                                name="name"
                                onChange={handleInputChange}
                                // defaultValue=""
                                value={item.name || ""}
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={6}
                                name="description"
                                // defaultValue=""
                                onChange={handleInputChange}
                                value={item.description || ""}
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

export default CategoryEditView;