import * as utilities from '../../utilities/utilities';
import { IAuthor, ISearchAuthor } from '../../Domain/Entities/Author';

const AuthorAPI = {

    async createAuthor(author: IAuthor): Promise<{ author: IAuthor; error: any; }> {
        try {
            let response = await utilities.postApiCall(`author`, author);
            console.log("CREATE AUTHOR API RESPONSE: =>", response.data.data)
            // debugger
            return { author: response.data.data, error: null };
        } catch (error) {
            return { author: null, error: new Error(`Could not create Author`) }
        }
    },

    async loadAuthor(authorId: string): Promise<{ author: IAuthor; error: any; }> {
        try {
            let response = await utilities.getApiCall(`author/${authorId}`);
            console.log("LOAD AUTHOR API RESPONSE: =>", response.data.data)
            // console.log(response.data)
            return { author: response.data.data, error: null };
        } catch (error) {
            return { author: null, error: new Error(`Could not load Author`) }
        }
    },

    async loadAuthors(searchPayload: ISearchAuthor): Promise<{ authors: IAuthor[]; count: number, error: any; }> {
        try {

            let query = `author?`;

            if (searchPayload.first_name && searchPayload.first_name !== "") {
                query += `first_name=${searchPayload.first_name}&`
            }

            if (searchPayload.last_name && searchPayload.last_name !== "") {
                query += `last_name=${searchPayload.last_name}&`
            }

            query += `limit=${searchPayload.limit}&offset=${searchPayload.offset}`
            console.log(query)
            let response = await utilities.getApiCall(query);
            console.log("LOAD AUTHORS API RESPONSE: =>", response.data.data);

            return { authors: response.data.data, count: parseInt(response.data.count), error: null };
        } catch (error) {
            return { authors: [] as IAuthor[], count: 0, error: new Error(`Could not load Authors`) }
        }
    },

    async removeAuthor(authorId: string): Promise<{ error: any; }> {
        try {
            let response = await utilities.deleteApiCall(`author/${authorId}`);
            console.log("REMOVE AUTHOR API RESPONSE: =>", response.data)
            return { error: null };
        } catch (error) {
            return { error: new Error(`Could not remove Author`) }
        }
    },

    async updateAuthor(author: IAuthor): Promise<{ author: IAuthor; error: any; }> {
        try {
            let url = `author/${author.author_id}`
            let response = await utilities.putApiCall(url, author);
            console.log("UPDATE AUTHOR API RESPONSE: =>", response.data)
            return { author: response.data, error: null };
        } catch (error) {
            return { author: null, error: new Error(`Could not update Author`) }
        }
    }
}

export default AuthorAPI;