import CategoryAPI from "../Datasources/CategoryAPI";
import { ICategory, ISearchCategory } from '../../Domain/Entities/Category';
import ICategoryUseCases from '../../Domain/Usecases/CategoryUseCases';

export default class CategoryRepository implements ICategoryUseCases {
    async createCategory(category: ICategory): Promise<{ category: ICategory; error: Error; }> {
        return await CategoryAPI.createCategory(category);
    }
    async loadCategory(categoryId: string): Promise<{ category: ICategory; error: Error; }> {
        return await CategoryAPI.loadCategory(categoryId);
    }
    async loadCategories(searchPayload: ISearchCategory): Promise<{ categories: ICategory[]; count: number, error: Error; }> {
        return await CategoryAPI.loadCategories(searchPayload);
    }
    async removeCategory(categoryId: string): Promise<{ error: Error; }> {
        return await CategoryAPI.removeCategory(categoryId);
    }
    async updateCategory(category: ICategory): Promise<{ category: ICategory; error: Error; }> {
        return await CategoryAPI.updateCategory(category);
    }

}