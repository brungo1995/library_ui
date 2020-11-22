import React from "react";
import { IAuthor } from "../../../Domain/Entities/Author";
import { AlertContext } from "../../../context_providers/alert_context";
import AuthorRepository from "../../../Data/Repositories/AuthorRepository";
import _ from "lodash";

function AuthorDetailVM({ author_id, history }) {
    const initialValue = { first_name: "", last_name: "" };
    const [item, setItem] = React.useState<IAuthor>(initialValue);
    const [masterItem, setMasterItem] = React.useState<IAuthor>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const Alert = React.useContext(AlertContext);
    const authorRepository = new AuthorRepository();

    React.useEffect(() => {
        if (author_id === "new") {
            setItem(initialValue);
        }
    }, [author_id]);

    async function createAuthor() {
        const { author, error } = await authorRepository.createAuthor(item);
        // setSubmitting(false);
        if (error) {
            Alert.error(error.message);
            return;
        }
        // console.log("CREATED CATEGORY: => ", author)

        Alert.info("Author Created");
        history.replace(`/author/${author.author_id}/info`, { isReloadAuthorList: true });
    }

    async function loadAuthor(): Promise<void> {
        setLoading(true);
        let { author, error } = await authorRepository.loadAuthor(author_id);
        setLoading(false);
        if (error) {
            Alert.error(error.message);
            return;
        }

        // console.log(author)
        setItem(author);
        setMasterItem(author)
    }

    function onCancel() {
        if (isItemEdited()) {
            Alert.confirm("Would you like to leave without saving changes?", onOkConfirmation);
        } else {
            if (author_id === "new") {
                history.replace(`/author`);
            } else {
                history.replace(`/author/${item.author_id}/info`);
            }
        }
    }

    function isItemEdited() {
        let isEdited = !_.isEqual(masterItem, item);
        // console.log("IS EDITED: => ", isEdited)
        return isEdited
    }

    function isPayloadValid() {
        let isvalid = !(
            _.isEmpty(item.first_name)
            ||
            _.isEmpty(item.last_name)
        )
            ;
        return isvalid;
    }

    const onOkConfirmation = () => history.goBack();

    async function onSave() {
        if (isItemEdited()) {
            if (isPayloadValid()) {
                if (author_id === "new") {
                    await createAuthor();
                } else {
                    await updateAuthor();
                }
            }
        } else {

            if (author_id === "new") {
                history.replace(`/author`);
            } else {
                history.replace(`/author/${item.author_id}/info`);
            }
        }
    }

    async function updateAuthor() {
        const { author, error } = await authorRepository.updateAuthor(item);
        // setSubmitting(false);
        if (error) {
            Alert.error(error.message);
            return;
        }
        Alert.info("Author Updated");
        history.replace(`/author/${item.author_id}/info`, { isReloadAuthorList: true });
    }

    function handleInputChange(e) {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    return {
        isLoading,
        item,
        loadAuthor,
        isPayloadValid,
        onCancel,
        handleInputChange,
        onSave
    };
}

export default AuthorDetailVM;
