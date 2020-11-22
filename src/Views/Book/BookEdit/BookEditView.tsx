import * as React from "react";
import * as _ from "lodash";
import { ICategory } from "../../../Domain/Entities/Category";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TabPanel from "../../../components/TabPanel";
import { useHistory, useParams } from "react-router-dom";
import useVM from "./BookEditVM";
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MainContext } from "../../../context_providers/main_context"
import { IAuthor } from "../../../Domain/Entities/Author";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '35ch',
            },
        },
        button: {
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: '100%',
            // minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

    }),
);

function BookEditView({ value }): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    let isbn_number = params['isbn_number'];
    const isNewBook = isbn_number === "new";
    const { categories, authors } = React.useContext(MainContext)

    const { isLoading,
        item, bookCategories,
        loadBook,
        onCancel,
        handleInputChange,
        onSave,
        handleInputChangeCategories,
        isPayloadValid } = useVM({
            isbn_number: isbn_number,
            history,
        });


    React.useEffect(() => {
        if (!isNewBook) {
            loadBook();
        }
    }, [isbn_number]);



    return (
        <TabPanel value={value} index={2}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Grid container spacing={3}
                    >
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Book Name"
                                name="name"
                                onChange={handleInputChange}
                                value={item.name || ""}
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                className={classes.formControl}
                            >

                                <Autocomplete
                                    limitTags={1}
                                    value={(authors || []).find(author => author.author_id == item.author) || null}
                                    id="multiple-limit-tags"
                                    options={authors}
                                    getOptionLabel={(option: IAuthor) => option.first_name}
                                    onChange={(e, value: any) => {
                                        let event = {
                                            target: {
                                                name: 'author',
                                                value: (value && value.author_id) || 0
                                            }
                                        }
                                        handleInputChange(event)
                                    }}
                                    renderInput={(params) => (

                                        <TextField required {...params} style={{ marginTop: '0px' }}
                                            variant="outlined"
                                            label="Author"
                                            placeholder="Author" />
                                    )}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled={!isNewBook}
                                // disabled = {isNewBook ? false:true}
                                fullWidth
                                required
                                id="outlined-required"
                                label="ISBN Number"
                                name="isbn_number"
                                onChange={handleInputChange}
                                value={item.isbn_number || ""}
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required
                                className={classes.formControl}
                            >

                                <Autocomplete style={{ marginTop: '0px' }}
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-tags"
                                    options={categories}
                                    getOptionLabel={(option: ICategory) => option.name}
                                    value={bookCategories}
                                    onChange={(e, values: any) => {
                                        let event = {
                                            target: {
                                                name: 'categories',
                                                values: values
                                            }
                                        }
                                        handleInputChangeCategories(event)
                                        console.log(values)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} style={{ marginTop: '0px' }}
                                            variant="outlined"
                                            label="Categories"
                                            placeholder="Categories"
                                            required />
                                    )}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="outlined-required"
                                label="Year published"
                                name="year_published"
                                onChange={handleInputChange}
                                value={item.year_published || ""}
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                    <Grid container spacing={3}
                        justify="center"
                        alignItems="center"
                    >
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

export default BookEditView;