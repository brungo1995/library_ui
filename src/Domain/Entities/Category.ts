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

export interface ISearchCategory {
    name?: string;
    limit: number;
    offset: number;
}
