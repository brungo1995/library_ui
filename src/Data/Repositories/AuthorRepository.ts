import AuthorAPI from "../Datasources/AuthorAPI";
import { IAuthor, ISearchAuthor } from '../../Domain/Entities/Author';
import IAuthorUseCases from '../../Domain/Usecases/AuthorUseCases';

export default class AuthorRepository implements IAuthorUseCases {
    async createAuthor(author: IAuthor): Promise<{ author: IAuthor; error: Error; }> {
        return await AuthorAPI.createAuthor(author);
    }
    async loadAuthor(authorId: string): Promise<{ author: IAuthor; error: Error; }> {
        return await AuthorAPI.loadAuthor(authorId);
    }
    async loadAuthors(searchPayload: ISearchAuthor): Promise<{ authors: IAuthor[]; count: number, error: Error; }> {
        return await AuthorAPI.loadAuthors(searchPayload);
    }

    async removeAuthor(authorId: string): Promise<{ error: Error; }> {
        return await AuthorAPI.removeAuthor(authorId);
    }
    async updateAuthor(author: IAuthor): Promise<{ author: IAuthor; error: Error; }> {
        return await AuthorAPI.updateAuthor(author);
    }

}