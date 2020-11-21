import React from "react";
import { IBookResponseCollection } from "../../../Domain/Entities/Book";
import { AlertContext } from "../../../context_providers/alert_context";
import BookRepository from "../../../Data/Repositories/BookRepository";

function BookInfoVM({ isbn_number, history }) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [item, setItem] = React.useState<IBookResponseCollection>({} as IBookResponseCollection);
    const Alert = React.useContext(AlertContext);
    const bookRepository = new BookRepository();

    async function loadBook(): Promise<void> {
        setIsLoading(true);
        let { book, error } = await bookRepository.loadBook(isbn_number);
        setIsLoading(false);

        // console.log(book)

        if (error) {
            Alert.error(error.message);
            return;
        }

        setItem(book);
    }

    function onDelete() {
        Alert.confirm("Are you sure you would like to remove this Book?", removeBook);
    }

    async function removeBook(cb): Promise<void> {
        let { error } = await bookRepository.removeBook(isbn_number);
        if (error) {
            Alert.error(error.message);
            console.log(error)
            return;
        }
        Alert.info("Book Removed");

        history.replace(`/book`, { isReloadBookList: true });
    }

    return {
        isLoading, item, loadBook, onDelete,
        // onEdit
    };
}

export default BookInfoVM;
