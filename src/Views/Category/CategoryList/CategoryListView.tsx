import * as React from "react";
import * as _ from "lodash";
import { Col, Row, Spinner } from "reactstrap";
// import { ICategory } from "../../../Domain/Entities/Category";
// import { findParams } from "../../../utilities/utilities";
// import SearchBar from "../../../components/SearchBar";
// import ListItemView from "../../../components/ListView";
import { NavLink, RouteComponentProps } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, useTheme, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TabPanel from "../../../components/TabPanel";
import { useHistory, useLocation } from "react-router-dom";
import useVM from "./CategoryListVM";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },

        spinner: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'inherit',
            // backgroundColor: '#CCCCFF',
            // backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'black',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            borderBottom: '1px solid black',
            borderWidth: '100%',
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '50ch',
                // width: '20ch',
            },
        },
        table: {
            minWidth: 650,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);
// interface props extends RouteComponentProps<any, any, any> { }
// function CategoryListView({ history, match, location }: props): JSX.Element {
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

function CategoryListView({ value }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();


    const { totalNumberOfRows, isLoading, items, searchText, page, offset, rowsPerPage,
        setRowsPerPage, setOffset, setPage, loadCategories, onSelect } = useVM({
            history, location,
        });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        // console.log("TEST")
        setPage(newPage);
        loadCategories({ page: newPage, rowsPerPage: rowsPerPage });
    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        loadCategories({ page: page, rowsPerPage: parseInt(event.target.value, 10) })
    };

    const handleClick = (id) => {
        history.push(`/category/${id}/info`)
        // console.log(id)
    };

    function TablePaginationActions(props: TablePaginationActionsProps) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;

        const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page + 1);
        };

        return (
            <Container >
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
            </Container>
        );
    }

    React.useEffect(() => {
        loadCategories({});
    }, []);

    return (
        <>
            <TabPanel value={value} index={0}>
                <CssBaseline />
                <Container maxWidth="lg" className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Container className={classes.search}>
                                {/* <Container className={classes.searchIcon}>
                                <SearchIcon />
                            </Container> */}
                                <InputBase
                                    placeholder="Search by name …"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Container>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>

                                <Container>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="left">Description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                isLoading ?
                                                    (<tr><td colSpan={2}><Spinner /></td></tr>)
                                                    :
                                                    // (
                                                    //     rowsPerPage > 0
                                                    //         ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    //         : items
                                                    // )
                                                    items
                                                        .map((row, idx) => (
                                                            <TableRow key={idx}
                                                                onClick={() => onSelect(row.category_id)}
                                                            >
                                                                <TableCell component="td" scope="row">
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.description}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                            }

                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    // rowsPerPageOptions={[]}
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={6}
                                                    // count={data.length}
                                                    count={totalNumberOfRows}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: { 'aria-label': 'rows per page' },
                                                        native: true,
                                                    }}
                                                    onLoad={() => console.log('loadind data')}
                                                    onChangePage={handleChangePage}
                                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>

                                </Container>

                            </TableContainer>

                        </Grid>
                    </Grid>
                </Container>

            </TabPanel>
        </>
    )
}

export default CategoryListView;


const data = [
    {
        "category_id": 1,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 10,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 100,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1000,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 11,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 111,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1111,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 12,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 122,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1222,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 13,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 133,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1333,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    }
    // ,
    // {
    //     "category_id": 14,
    //     "name": "Action",
    //     "description": "A film with a fast-moving plot , usually containing scenes of violence ",
    //     "operation_by_user": "Domingos"
    // }
]