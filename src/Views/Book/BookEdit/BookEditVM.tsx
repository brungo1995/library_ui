import React from "react";
import { IBook } from "../../../Domain/Entities/Book";
import { ICategory } from "../../../Domain/Entities/Category";
import { AlertContext } from "../../../context_providers/alert_context";
import BookRepository from "../../../Data/Repositories/BookRepository";
import _ from "lodash";
import moment from 'moment';
import { MainContext } from "../../../context_providers/main_context"
import { debug } from "console";

function BookDetailVM({ isbn_number, history }) {
    const initialValue = { name: "", isbn_number: "", categories: [], year_published: "", author: 0 };
    const [item, setItem] = React.useState<IBook>(initialValue);
    const [masterItem, setMasterItem] = React.useState<IBook>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [bookCategories, setBookCategories] = React.useState([])
    const Alert = React.useContext(AlertContext);
    const bookRepository = new BookRepository();
    const { categories, authors } = React.useContext(MainContext)
    const [errorMessage, setErrorMessage] = React.useState("");


    React.useEffect(() => {
        if (isbn_number === "new") {
            setItem(initialValue);
        }
    }, [isbn_number]);

    async function createBook() {
        let payload = { ...item, categories: bookCategories.map((cat: ICategory) => parseInt(cat.category_id)) }
        const { book, error } = await bookRepository.createBook({ ...item, categories: bookCategories.map((cat: ICategory) => parseInt(cat.category_id)) });

        if (error) {
            Alert.error(error.message);
            setErrorMessage(error.message)
            return;
        }


        Alert.info("Book Created");
        history.replace(`/book/${book.isbn_number}/info`, { isReloadBookList: true });
    }

    async function loadBook(): Promise<void> {
        setLoading(true);
        let { book, error } = await bookRepository.loadBook(isbn_number);
        setLoading(false);
        if (error) {
            setErrorMessage(error.message)
            Alert.error(error.message);
            return;
        }

        let refactoredBook = refactorBookLoadResponse(book)

        // console.log(book)
        setItem(refactoredBook);
        setMasterItem(refactoredBook)
    }

    function refactorBookLoadResponse(book) {
        setBookCategories(book.categories);
        let refactoredBook = { ...book, author: book.author_id, name: book.book_name }
        return refactoredBook;
    }

    function onCancel() {
        if (isItemEdited()) {
            Alert.confirm("Would you like to leave without saving changes?", onOkConfirmation);
        } else {
            if (isbn_number === "new") {
                history.replace(`/book`);
            } else {
                history.replace(`/book/${item.isbn_number}/info`);
            }
        }
    }

    function isItemEdited() {
        let isEdited = !_.isEqual(masterItem, item);
        // console.log("IS EDITED: => ", isEdited)
        return isEdited
    }

    const onOkConfirmation = () => history.goBack();

    async function onSave() {
        if (isItemEdited()) {
            if (isPayloadValid()) {
                if (isbn_number === "new") {
                    await createBook();
                } else {
                    await updateBook();
                }
            }
        } else {

            if (isbn_number === "new") {
                history.replace(`/book`);
            } else {
                history.replace(`/book/${item.isbn_number}/info`);
            }
        }
    }

    function isPayloadValid() {
        const dateFormat = 'YYYY';
        const toDateFormat = moment(new Date(item.year_published)).format(dateFormat);
        let isValidYear = moment(toDateFormat, dateFormat, true).isValid()
        console.log("IS VALID YEAR => ", isValidYear);

        let isvalid = !(
            _.isEmpty(item.name)
            ||
            _.isEmpty(item.isbn_number)
            ||
            _.isEmpty(item.year_published)
            ||
            item.author <= 0
            ||
            item.categories.length <= 0
            ||
            !isValidYear
            ||
            item.year_published.length < 4
        )
            ;
        return isvalid;
    }


    async function updateBook() {
        let payload = { ...item, categories: bookCategories.map((cat: ICategory) => parseInt(cat.category_id)) }
        const { book, error } = await bookRepository.updateBook(payload);
        // setSubmitting(false);
        if (error) {
            setErrorMessage(error.message)
            Alert.error(error.message);
            return;
        }
        Alert.info("Book Updated");
        history.replace(`/book/${item.isbn_number}/info`, { isReloadBookList: true });
    }

    function handleInputChange(e) {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    function handleInputChangeCategories(e) {
        // let newValues = [].concat(e.target.values);
        let newValues = [].concat((e.target.values || []).map(category => category.category_id));
        console.log(newValues)
        setItem({ ...item, ['categories']: newValues });
        setBookCategories(e.target.values);
        // setItem({ ...item, ['categories']: newValues });
    }

    return {
        isLoading, bookCategories,
        item,
        categories,
        errorMessage,
        isPayloadValid,
        handleInputChangeCategories,
        loadBook,
        onCancel,
        handleInputChange,
        onSave
    };
}

export default BookDetailVM;
