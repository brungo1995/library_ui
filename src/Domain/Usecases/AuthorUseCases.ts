import { IAuthor, ISearchAuthor } from '../Entities/Author';

export default interface IAuthorUseCases {
    createAuthor(author: IAuthor): Promise<{ author: IAuthor; error: any }>;

    loadAuthor(authorId: string): Promise<{ author: IAuthor; error: any }>;

    loadAuthors(searchPayload: ISearchAuthor): Promise<{ authors: IAuthor[]; count: number, error: any }>;

    removeAuthor(authorId: string): Promise<{ error: any }>;

    updateAuthor(author: IAuthor): Promise<{ author: IAuthor; error: any }>;
}