import { ICategory, ISearchCategory } from '../Entities/Category';

export default interface ICategoryUseCases {
    createCategory(category: ICategory): Promise<{ category: ICategory; error: Error }>;

    loadCategory(categoryId: string): Promise<{ category: ICategory; error: Error }>;

    loadCategories(searchPayload: ISearchCategory): Promise<{ categories: ICategory[]; count: number, error: Error }>;

    removeCategory(categoryId: string): Promise<{ error: Error }>;

    updateCategory(category: ICategory, categoryId: string): Promise<{ category: ICategory; error: Error }>;
}