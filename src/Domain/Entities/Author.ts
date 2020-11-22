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

export interface ISearchAuthor {
    first_name?: string;
    last_name?: string;
    limit: number;
    offset: number;
}


