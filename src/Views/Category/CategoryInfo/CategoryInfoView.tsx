import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
import { ICategory } from "../../../Domain/Entities/Category";
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
// function CategoryInfoView({ history, match, location }: props): JSX.Element {
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function CategoryInfoView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();


    function onEdit() {
        let category_id = params['category_id']
        history.push(`/category/${category_id}`);
    }


    return (
        <TabPanel value={value} index={1}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>

                            <Typography variant="h5" component="h5">
                                Name
                            </Typography>
                            <Typography paragraph>
                                {data.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h5">
                                Description
                            </Typography>
                            <Typography paragraph>
                                {data.description}
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
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
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
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
