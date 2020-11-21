import * as Yup from 'yup';

export interface IAuthor {
    author_id?: string;
    first_name: string;
    last_name: string;
}

export interface IGetCategoriesResponse {
    categories: IAuthor[];
    count: number;
    // error?: Error
}

export const AuthorValidationSchema = Yup.object({
    first_name: Yup.string().required("Required!"),
    last_name: Yup.string().required("Required!"),
});


export interface ISearchAuthor {
    first_name?: string;
    last_name?: string;
    limit: number;
    offset: number;
}
