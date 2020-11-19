import * as Yup from 'yup';

export interface ICategory {
    category_id?: string;
    name: string;
    description: string;
}

export interface IGetCategoriesResponse {
    categories: ICategory[];
    count: number;
    // error?: Error
}

export const CategoryValidationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
});


export interface ISearchCategory {
    name?: string;
    limit: number;
    offset: number;
}

// {
//     "status": "success",
//     "data": [
//       {
//         "category_id": 4,
//         "name": "Science",
//         "description": "this is Science",
//         "operation_by_user": "EDVALDO"
//       },
//       {
//         "category_id": 3,
//         "name": "Fiction",
//         "description": "this is Fiction",
//         "operation_by_user": "EDVALDO"
//       },
//       {
//         "category_id": 2,
//         "name": "Drama",
//         "description": "this is Drama",
//         "operation_by_user": "EDVALDO"
//       },
//       {
//         "category_id": 1,
//         "name": "Ation",
//         "description": "this is action",
//         "operation_by_user": "EDVALDO"
//       }
//     ]
//   }