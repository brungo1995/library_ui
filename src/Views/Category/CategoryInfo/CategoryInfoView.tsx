import * as React from "react";
import * as _ from "lodash";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TabPanel from "../../../components/TabPanel";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import useVM from "./CategoryInfoVM";


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


function CategoryInfoView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let category_id = params['category_id']

    const { isLoading, item, loadCategory, onDelete, } = useVM({
        category_id,
        history: history,
    });

    function onEdit() {
        let category_id = params['category_id']
        history.push(`/category/${category_id}`);
    }

    React.useEffect(() => {
        loadCategory();
    }, [category_id]);

    return (
        <TabPanel value={value} index={1}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    {isLoading ? (
                        <strong>Loading Category  <i className="fa fa-spinner fa-spin ml-1" />
                        </strong>
                    ) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>

                                    <Typography variant="h5" component="h5">
                                        Name
                            </Typography>
                                    <Typography paragraph>
                                        {item.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h5">
                                        Description
                            </Typography>
                                    <Typography paragraph>
                                        {item.description}
                                    </Typography>

                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        onClick={onDelete}
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                            </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => onEdit()}
                                        // className={classes.button}
                                        startIcon={<EditIcon />}>Edit
                            </Button>
                                </Grid>
                            </Grid>
                        )}
                </div>
            </Container>
        </TabPanel>
    )
}

export default CategoryInfoView;


const data =
{
    "category_id": 1,
    "name": "Action",
    "description": "A film with a fast-moving plot , usually containing scenes of violence ",
    "operation_by_user": "Domingos"
}
