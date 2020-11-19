import * as utilities from '../../utilities/utilities';
import { ICategory, ISearchCategory, IGetCategoriesResponse } from '../../Domain/Entities/Category';

const CategoryAPI = {
    async createCategory(category: ICategory): Promise<{ category: ICategory; error: Error; }> {
        try {
            let response = await utilities.postApiCall(`category`, category);
            // console.log("CREATE API RESPONSE: =>", response.data.data)
            // debugger
            return { category: response.data.data, error: null };
        } catch (error) {
            return { category: null, error: new Error(`Could not create Category`) }
        }
    },

    async loadCategory(categoryId: string): Promise<{ category: ICategory; error: Error; }> {
        try {
            let response = await utilities.getApiCall(`category/${categoryId}`);
            // console.log(response.data)
            return { category: response.data.data, error: null };
        } catch (error) {
            return { category: null, error: new Error(`Could not load Category`) }
        }
    },

    async loadCategories(searchPayload: ISearchCategory): Promise<{ categories: ICategory[]; count: number, error: Error; }> {
        try {
            let isName = searchPayload.name && searchPayload.name !== "" ? searchPayload.name : null;
            let query = `category?`;

            if (isName) {
                query += `name=${isName}&`
            }

            query += `limit=${searchPayload.limit}&offset=${searchPayload.offset}`
            // console.log(query)
            let response = await utilities.getApiCall(query);
            // console.log(response.data)
            return { categories: response.data.data, count: parseInt(response.data.count), error: null };
        } catch (error) {
            return { categories: [] as ICategory[], count: 0, error: new Error(`Could not load Categories`) }
        }
    },

    async removeCategory(categoryId: string): Promise<{ error: Error; }> {
        try {
            let response = await utilities.deleteApiCall(`category/${categoryId}`);
            return { error: null };
        } catch (error) {
            return { error: new Error(`Could not remove Category`) }
        }
    },

    async updateCategory(category: ICategory): Promise<{ category: ICategory; error: Error; }> {
        try {
            let url = `category/${category.category_id}`
            let response = await utilities.putApiCall(url, category);
            return { category: response.data, error: null };
        } catch (error) {
            return { category: null, error: new Error(`Could not update Category`) }
        }
    }
}

export default CategoryAPI;