import * as React from "react";
import * as _ from "lodash";
import { Col, Row, Spinner } from "reactstrap";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, useTheme, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import FormControl from '@material-ui/core/FormControl';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TabPanel from "../../../components/TabPanel";
import { useHistory, useLocation } from "react-router-dom";
import useVM from "./BookListVM";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { MainContext } from "../../../context_providers/main_context"



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: '100%',
            // minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        button: {
            margin: theme.spacing(1),
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
            paddingLeft: `0px`,
            // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
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

function BookListView({ value }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { categories, authors } = React.useContext(MainContext)

    const { totalNumberOfRows,
        isLoading,
        items,
        author_first_name,
        author_last_name,
        category,
        book_name,
        isbn_number,
        year_published,
        page,
        offset,
        rowsPerPage,
        isValidPublishedYear,
        publishedYearErrorMeesage,
        handleAutocompleteInputChange,
        onAdd,
        setRowsPerPage,
        setOffset,
        setPage,
        loadBooks,
        onSelect,
        setAuthorFirstName,
        setAuthorLastName,
        setCategory,
        setBookName,
        setIsbnNumber,
        setYearPublished } = useVM({
            history, location,
        });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        // console.log("TEST")
        setPage(newPage);
        loadBooks({ page: newPage, rowsPerPage: rowsPerPage });
    };


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (parseInt(event.target.value, 10) === -1) {
            setRowsPerPage(totalNumberOfRows || 0);
            setPage(0);
            loadBooks({ page: 0, rowsPerPage: totalNumberOfRows || 0 })
            return
        }
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        loadBooks({ page: page, rowsPerPage: parseInt(event.target.value, 10) })
    };

    function onCreate() {
        history.push(`/book/new`)
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
        loadBooks({});
    }, []);

    return (
        <>
            <TabPanel value={value} index={0}>
                <CssBaseline />
                <Container maxWidth="lg" className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={4} >

                            <FormControl required
                                className={classes.formControl}
                            >
                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        value={author_first_name}
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        label="Author first name"
                                        onChange={(e) => setAuthorFirstName(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Container>

                                {/* <Autocomplete
                                        limitTags={1}
                                        value={(authors || []).find(author => author.first_name == author_first_name) || null}
                                        id="multiple-limit-tags"
                                        options={authors}
                                        getOptionLabel={(option: IAuthor) => option.first_name}
                                        onChange={(e, value: any) => {
                                            let event = {
                                                target: {
                                                    name: 'first_name',
                                                    value: (value && value.first_name) || ""
                                                }
                                            }
                                            handleAutocompleteInputChange(event)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Author first name" />
                                        )}
                                    /> */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>

                            <FormControl required
                                className={classes.formControl}
                            >
                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        value={author_last_name}
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        label="Author last name"
                                        onChange={(e) => setAuthorLastName(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Container>
                                {/* <Autocomplete
                                        limitTags={1}
                                        value={(authors || []).find(author => author.last_name == author_last_name) || null}
                                        id="multiple-limit-tags"
                                        options={authors}
                                        getOptionLabel={(option: IAuthor) => option.last_name}
                                        onChange={(e, value: any) => {
                                            let event = {
                                                target: {
                                                    name: 'last_name',
                                                    value: (value && value.last_name) || ""
                                                }
                                            }
                                            handleAutocompleteInputChange(event)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Author last name" />
                                        )}
                                    /> */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required
                                className={classes.formControl}
                            >

                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        value={category}
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Container>

                                {/* <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} > */}
                                {/* <Autocomplete
                                        limitTags={1}
                                        value={(categories || []).find(item => item.name == category) || null}
                                        id="multiple-limit-tags"
                                        options={categories}
                                        getOptionLabel={(option: ICategory) => option.name}
                                        onChange={(e, value: any) => {
                                            let event = {
                                                target: {
                                                    name: 'category',
                                                    value: (value && value.name) || value
                                                }
                                            }
                                            handleAutocompleteInputChange(event)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Categories" />
                                        )}
                                    /> */}
                                {/* </Container> */}
                            </FormControl>

                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required
                                className={classes.formControl}
                            >
                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        value={book_name}
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        label="Book name"
                                        onChange={(e) => setBookName(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Container>


                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required
                                className={classes.formControl}
                            >
                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        label="ISBN number"
                                        value={isbn_number}
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        onChange={(e) => setIsbnNumber(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Container>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl required
                                className={classes.formControl}
                            >
                                <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }} >
                                    <TextField
                                        style={{ width: "100%" }}
                                        value={year_published}
                                        label="Year published"
                                        classes={{
                                            root: classes.inputRoot,
                                        }}
                                        onChange={(e) => setYearPublished(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    // error={isValidPublishedYear()}
                                    // helperText={publishedYearErrorMeesage}
                                    />
                                </Container>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <Container className={classes.search} style={{ paddingLeft: "0px", marginLeft: "0px" }}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SearchIcon />}
                                    onClick={() => {
                                        setPage(0)
                                        loadBooks({ page: 0, rowsPerPage: rowsPerPage })
                                    }}
                                >
                                    Search
                                </Button>
                            </Container>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Container className={classes.search} style={{ paddingRight: "0px", marginRight: "0px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                    onClick={onCreate}
                                >
                                    Create
                                </Button>
                            </Container>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>

                                <Container>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Author Name</TableCell>
                                                <TableCell>Author Last Name</TableCell>
                                                <TableCell>Categories</TableCell>
                                                <TableCell>Year Published</TableCell>
                                                <TableCell>ISBN Number</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                isLoading ?
                                                    (<tr><td colSpan={2}><Spinner /></td></tr>)
                                                    :
                                                    items
                                                        .map((row, idx) => (
                                                            <TableRow key={idx}
                                                                onClick={() => onSelect(row.isbn_number)}
                                                            >
                                                                <TableCell component="td" scope="row">
                                                                    {row.book_name}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.author_name}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.author_last_name}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.categories.map(category => category.name).join(",")}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.year_published}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {row.isbn_number}
                                                                </TableCell>

                                                            </TableRow>
                                                        ))
                                            }

                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    // rowsPerPageOptions={[]}
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={6}
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

export default BookListView;
