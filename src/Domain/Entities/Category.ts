import * as Yup from 'yup';

export interface ICategory {
    category_id?: string;
    name: string;
    description: string;
}

export const CategoryValidationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
});
