import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
import { IAuthor } from "../../../Domain/Entities/Author";
import { findParams } from "../../../utilities/utilities";
import SearchBar from "../../../components/SearchBar";
import { NavLink, RouteComponentProps } from "react-router-dom";
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
import useVM from "./AuthorInfoVM";


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

// interface props extends RouteComponentProps<any, any, any> { }
// function AuthorInfoView({ history, match, location }: props): JSX.Element {

function AuthorInfoView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let author_id = params['author_id']

    const { isLoading, item, loadAuthor, onDelete, } = useVM({
        author_id,
        history: history,
    });

    function onEdit() {
        let author_id = params['author_id']
        history.push(`/author/${author_id}`);
    }

    React.useEffect(() => {
        loadAuthor();
    }, [author_id]);

    return (
        <TabPanel value={value} index={1}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    {isLoading ? (
                        <strong>Loading Author  <i className="fa fa-spinner fa-spin ml-1" />
                        </strong>
                    ) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>

                                    <Typography variant="h5" component="h5">
                                        Name
                            </Typography>
                                    <Typography paragraph>
                                        {item.first_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h5">
                                        Description
                            </Typography>
                                    <Typography paragraph>
                                        {item.last_name}
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

export default AuthorInfoView;
