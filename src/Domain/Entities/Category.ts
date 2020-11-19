import * as Yup from 'yup';

export interface ICategory {
    category_id?: string;
    name: string;
    description: string;
}

export interface IGetCategoriesResponse {
    categories: ICategory[];
    count: number;
    // error?: Error
}

export const CategoryValidationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
});


export interface ISearchCategory {
    name?: string;
    limit: number;
    offset: number;
}
