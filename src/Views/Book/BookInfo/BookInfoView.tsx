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
import useVM from "./BookInfoVM";


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

function BookInfoView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let isbn_number = params['isbn_number'];

    const { isLoading, item, loadBook, onDelete, } = useVM({
        isbn_number,
        history: history,
    });

    function onEdit() {
        let isbn_number = params['isbn_number']
        history.push(`/book/${isbn_number}`);
    }

    React.useEffect(() => {
        loadBook();
    }, [isbn_number]);

    return (
        <TabPanel value={value} index={1}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    {isLoading ? (
                        <strong>Loading Book  <i className="fa fa-spinner fa-spin ml-1" />
                        </strong>
                    ) : (
                            <Grid container spacing={3}>

                                {/*  "isbn_number": "4",
                                        "book_name": "Fintech",
                                        "author": 4,
                                        "year_published": "2017",
                                        "first_name": "Braulio",
                                        "last_name": "Braulio SURNAME",
                                        "categories": [
                                        {
                                            "category_id": 4,
                                            "isbn_number": "4",
                                            "name": "Science"
                                        },
                                        {
                                            "category_id": 3,
                                            "isbn_number": "4",
                                            "name": "Fiction"
                                        }
                                        ]*/}
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        Book Name
                                    </Typography>
                                    <Typography paragraph>
                                        {item.book_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        Author Name
                                    </Typography>
                                    <Typography paragraph>
                                        {item.author_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        Author last name
                                    </Typography>
                                    <Typography paragraph>
                                        {item.author_last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        Year published
                                    </Typography>
                                    <Typography paragraph>
                                        {item.year_published}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        Categories
                                    </Typography>
                                    <Typography paragraph>
                                        {(item.categories || []).map(category => category.name).join(", ")}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h5" component="h5">
                                        ISBN Number
                                    </Typography>
                                    <Typography paragraph>
                                        {item.isbn_number}
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

export default BookInfoView;
