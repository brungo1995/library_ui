import { IBook, ISearchBook, IBookResponseCollection } from '../Entities/Book';

export default interface IBookUseCases {
    createBook(book: IBook): Promise<{ book: IBook; error: any }>;

    loadBook(bookId: string): Promise<{ book: IBookResponseCollection; error: any }>;

    loadBooks(searchPayload: ISearchBook): Promise<{ data: IBookResponseCollection[]; count: number, error: any }>;

    removeBook(bookId: string): Promise<{ error: any }>;

    updateBook(book: IBook): Promise<{ book: IBook; error: any }>;
}