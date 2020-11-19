import React from "react";
import { ICategory, CategoryValidationSchema } from "../../../Domain/Entities/Category";
import { AlertContext } from "../../../context_providers/alert_context";
import CategoryRepository from "../../../Data/Repositories/CategoryRepository";
import _ from "lodash";

function CategoryDetailVM({ category_id, history }) {
    const initialValue = { description: "", name: "" };
    const [item, setItem] = React.useState<ICategory>(initialValue);
    const [masterItem, setMasterItem] = React.useState<ICategory>(initialValue);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const Alert = React.useContext(AlertContext);
    const categoryRepository = new CategoryRepository();

    React.useEffect(() => {
        if (category_id === "new") {
            setItem(initialValue);
        }
    }, [category_id]);

    async function createCategory() {
        const { category, error } = await categoryRepository.createCategory(item);
        // setSubmitting(false);
        if (error) {
            Alert.error(error.message);
            return;
        }

        Alert.info("Category Created");
        history.replace(`/category/${category_id}/info`, { isReloadCategoryList: true });
    }

    async function loadCategory(): Promise<void> {
        setLoading(true);
        let { category, error } = await categoryRepository.loadCategory(category_id);
        setLoading(false);
        if (error) {
            Alert.error(error.message);
            return;
        }

        console.log(category)
        setItem(category);
        setMasterItem(category)
    }

    function onCancel() {
        if (isItemEdited()) {
            Alert.confirm("Would you like to leave without saving changes?", onOkConfirmation);
        } else {
            if (category_id === "new") {
                history.replace(`/category`);
            } else {
                history.replace(`/category/${item.category_id}/info`);
            }
        }
    }

    function isItemEdited() {
        let isEdited = !_.isEqual(masterItem, item);
        console.log("IS EDITED: => ", isEdited)
        return isEdited
    }

    const onOkConfirmation = () => history.goBack();

    async function onSave() {
        if (isItemEdited()) {
            if (category_id === "new") {
                await createCategory();
            } else {
                await updateCategory();
            }
        } else {

            if (category_id === "new") {
                history.replace(`/category`);
            } else {
                history.replace(`/category/${item.category_id}/info`);
            }
        }
    }

    async function updateCategory() {
        const { category, error } = await categoryRepository.updateCategory(item);
        // setSubmitting(false);
        if (error) {
            Alert.error(error.message);
            return;
        }
        Alert.info("Category Updated");
        history.replace(`/category/${item.category_id}/info`, { isReloadCategoryList: true });
    }

    function handleInputChange(e) {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    return {
        isLoading,
        item,
        CategoryValidationSchema,
        loadCategory,
        onCancel,
        handleInputChange,
        onSave
    };
}

export default CategoryDetailVM;
