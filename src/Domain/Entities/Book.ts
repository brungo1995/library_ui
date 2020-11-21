import * as Yup from 'yup';
import { ICategory } from "./Category"
export interface IBook {
    author: number;
    name: string;
    isbn_number: string;
    categories: number[];
    year_published: string;
    // author_name?: string,
    // author_last_name?: string,
    // book_name?: string

}

export interface IGetBooksResponse {
    books: IBookResponseCollection[];
    count: number;
}


export interface IBookResponseCollection {
    isbn_number: string,
    book_name: string,
    year_published: string,
    author_name: string,
    author_last_name: string,
    categories: ICategory[]
}

export interface ISearchBook {
    author_first_name: string;
    author_last_name: string;
    category: string;
    book_name: string;
    isbn_number: string;
    year_published: string;
    limit: number;
    offset: number;
}
