import React from "react";
import { ICategory } from "../../../Domain/Entities/Category";
import { AlertContext } from "../../../context_providers/alert_context";
import CategoryRepository from "../../../Data/Repositories/CategoryRepository";

function CategoryInfoVM({ category_id, history }) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [item, setItem] = React.useState<ICategory>({} as ICategory);
    const Alert = React.useContext(AlertContext);
    const categoryRepository = new CategoryRepository();

    async function loadCategory(): Promise<void> {
        setIsLoading(true);
        let { category, error } = await categoryRepository.loadCategory(category_id);
        setIsLoading(false);

        // console.log(category)

        if (error) {
            Alert.error(error.message);
            return;
        }

        setItem(category);
    }

    function onDelete() {
        Alert.confirm("Are you sure you would like to remove this Category?", removeCategory);
    }

    async function removeCategory(cb): Promise<void> {
        let { error } = await categoryRepository.removeCategory(category_id);
        if (error) {
            Alert.error(error.message);
            console.log(error)
            return;
        }
        Alert.info("Category Removed");

        history.replace(`/category`, { isReloadCategoryList: true });
    }

    return {
        isLoading, item, loadCategory, onDelete,
        // onEdit
    };
}

export default CategoryInfoVM;
