import React from "react";
import { IBook, IBookResponseCollection } from "../../../Domain/Entities/Book";
import { ICategory } from "../../../Domain/Entities/Category";
import { AlertContext } from "../../../context_providers/alert_context";
import BookRepository from "../../../Data/Repositories/BookRepository";
import _ from "lodash";
import moment from 'moment';
import { MainContext } from "../../../context_providers/main_context"

function BookDetailVM({ isbn_number, history }) {
    const initialValue = { name: "", isbn_number: "", categories: [], year_published: "", author: 0 };
    const [item, setItem] = React.useState<IBook>(initialValue);
    const [masterItem, setMasterItem] = React.useState<IBook>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [bookCategories, setBookCategories] = React.useState([])
    const Alert = React.useContext(AlertContext);
    const bookRepository = new BookRepository();
    const { categories, authors } = React.useContext(MainContext)

    React.useEffect(() => {
        if (isbn_number === "new") {
            setItem(initialValue);
        }
    }, [isbn_number]);

    async function createBook() {
        const { book, error } = await bookRepository.createBook(item);
        // setSubmitting(false);
        if (error) {
            Alert.error(error.message);
            return;
        }
        // console.log("CREATED CATEGORY: => ", book)

        Alert.info("Book Created");
        history.replace(`/book/${book.isbn_number}/info`, { isReloadBookList: true });
    }

    async function loadBook(): Promise<void> {
        setLoading(true);
        let { book, error } = await bookRepository.loadBook(isbn_number);
        setLoading(false);
        if (error) {
            Alert.error(error.message);
            return;
        }

        let refactoredBook = refactorBookLoadResponse(book)

        // console.log(book)
        setItem(refactoredBook);
        setMasterItem(refactoredBook)
    }

    function refactorBookLoadResponse(book) {
        // "isbn_number": "4",
        // "book_name": "Fintech",
        // "author_id": 4,
        // "year_published": "2017",
        // "author_name": "Braulio",
        // "author_last_name": "Braulio SURNAME",
        // "categories": [
        //   {
        //     "category_id": 4,
        //     "isbn_number": "4",
        //     "name": "Science"
        //   },
        //   {
        //     "category_id": 3,
        //     "isbn_number": "4",
        //     "name": "Fiction"
        //   }
        // ]

        // let bookCategs = [];
        // book.categories.forEach(category_id => {
        //     categories.forEach((element: ICategory) => {
        //         if (element.category_id === category_id) {
        //             bookCategs.push(element)
        //         }
        //     });
        // });

        setBookCategories(book.categories);
        // let refactoredBook = { ...book, author: book.author_id, name: book.book_name, categories: (book.categories || []).map(category => category.category_id) }
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
            if (isbn_number === "new") {
                await createBook();
            } else {
                await updateBook();
            }
        } else {

            if (isbn_number === "new") {
                history.replace(`/book`);
            } else {
                history.replace(`/book/${item.isbn_number}/info`);
            }
        }
    }

    async function updateBook() {
        debugger
        const { book, error } = await bookRepository.updateBook(item);
        // setSubmitting(false);
        if (error) {
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
        handleInputChangeCategories,
        loadBook,
        onCancel,
        handleInputChange,
        onSave
    };
}

export default BookDetailVM;
