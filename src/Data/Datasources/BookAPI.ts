import * as utilities from '../../utilities/utilities';
import { IBook, ISearchBook, IBookResponseCollection } from '../../Domain/Entities/Book';

const BookAPI = {

    async createBook(book: IBook): Promise<{ book: IBook; error: any; }> {
        try {
            let response = await utilities.postApiCall(`book`, book);
            // console.log("CREATE BOOK API RESPONSE: =>", response.data.data)
            return { book: response.data.data, error: null };
        } catch (error) {
            return { book: null, error: new Error(`Could not create Book`) }
        }
    },

    async loadBook(bookId: string): Promise<{ book: IBookResponseCollection; error: any; }> {
        try {
            let response = await utilities.getApiCall(`book/${bookId}`);
            // console.log("LOAD BOOK API RESPONSE: =>", response.data.data)
            // console.log(response.data)
            return { book: response.data.data, error: null };
        } catch (error) {
            return { book: null, error: new Error(`Could not load Book`) }
        }
    },

    async loadBooks(searchPayload: ISearchBook): Promise<{ data: IBookResponseCollection[]; count: number, error: any; }> {
        try {

            let query = `book?`;

            if (searchPayload.author_first_name && searchPayload.author_first_name !== "") {
                query += `author_first_name=${searchPayload.author_first_name}&`
            }

            if (searchPayload.author_last_name && searchPayload.author_last_name !== "") {
                query += `author_last_name=${searchPayload.author_last_name}&`
            }

            if (searchPayload.category && searchPayload.category !== "") {
                query += `category=${searchPayload.category}&`
            }
            if (searchPayload.book_name && searchPayload.book_name !== "") {
                query += `book_name=${searchPayload.book_name}&`
            }
            if (searchPayload.isbn_number && searchPayload.isbn_number !== "") {
                query += `isbn_number=${searchPayload.isbn_number}&`
            }
            if (searchPayload.year_published && searchPayload.year_published !== "") {
                query += `year_published=${searchPayload.year_published}&`
            }

            query += `limit=${searchPayload.limit}&offset=${searchPayload.offset}`
            // console.log("======= LOAD ALL BOOKS QUERY => ", query)
            // console.log(query)
            let response = await utilities.getApiCall(query);
            // console.log("LOAD BOOKS API RESPONSE: =>", response.data.data);

            return { data: response.data.data, count: parseInt(response.data.count), error: null };
        } catch (error) {
            return { data: null, count: 0, error: new Error(`Could not load Books`) }
        }
    },

    async removeBook(bookId: string): Promise<{ error: any; }> {
        try {
            let response = await utilities.deleteApiCall(`book/${bookId}`);
            console.log("REMOVE BOOK API RESPONSE: =>", response.data)
            return { error: null };
        } catch (error) {
            return { error: new Error(`Could not remove Book`) }
        }
    },

    async updateBook(book: IBook): Promise<{ book: IBook; error: any; }> {
        try {
            let url = `book/${book.isbn_number}`
            let response = await utilities.putApiCall(url, book);
            console.log("UPDATE BOOK API RESPONSE: =>", response.data)
            return { book: response.data, error: null };
        } catch (error) {
            return { book: null, error: new Error(`Could not update Book`) }
        }
    }
}

export default BookAPI;