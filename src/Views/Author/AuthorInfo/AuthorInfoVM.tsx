import React from "react";
import { IAuthor } from "../../../Domain/Entities/Author";
import { AlertContext } from "../../../context_providers/alert_context";
import AuthorRepository from "../../../Data/Repositories/AuthorRepository";

function AuthorInfoVM({ author_id, history }) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [item, setItem] = React.useState<IAuthor>({} as IAuthor);
    const Alert = React.useContext(AlertContext);
    const authorRepository = new AuthorRepository();

    async function loadAuthor(): Promise<void> {
        setIsLoading(true);
        let { author, error } = await authorRepository.loadAuthor(author_id);
        setIsLoading(false);

        // console.log(author)

        if (error) {
            Alert.error(error.message);
            return;
        }

        setItem(author);
    }

    function onDelete() {
        Alert.confirm("Are you sure you would like to remove this Author?", removeAuthor);
    }

    async function removeAuthor(cb): Promise<void> {
        let { error } = await authorRepository.removeAuthor(author_id);
        if (error) {
            Alert.error(error.message);
            console.log(error)
            return;
        }
        Alert.info("Author Removed");

        history.replace(`/author`, { isReloadAuthorList: true });
    }

    return {
        isLoading, item, loadAuthor, onDelete,
        // onEdit
    };
}

export default AuthorInfoVM;
