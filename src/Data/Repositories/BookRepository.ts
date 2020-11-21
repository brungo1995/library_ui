import BookAPI from "../Datasources/BookAPI";
import { IBook, ISearchBook, IBookResponseCollection } from '../../Domain/Entities/Book';
import IBookUseCases from '../../Domain/Usecases/BookUseCases';

export default class BookRepository implements IBookUseCases {
    async createBook(book: IBook): Promise<{ book: IBook; error: Error; }> {
        return await BookAPI.createBook(book);
    }
    async loadBook(bookId: string): Promise<{ book: IBookResponseCollection; error: Error; }> {
        return await BookAPI.loadBook(bookId);
    }
    async loadBooks(searchPayload: ISearchBook): Promise<{ data: IBookResponseCollection[]; count: number, error: Error; }> {
        return await BookAPI.loadBooks(searchPayload);
    }

    async removeBook(bookId: string): Promise<{ error: Error; }> {
        return await BookAPI.removeBook(bookId);
    }
    async updateBook(book: IBook): Promise<{ book: IBook; error: Error; }> {
        return await BookAPI.updateBook(book);
    }

}