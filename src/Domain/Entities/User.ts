import * as Yup from 'yup';

export interface IUser {
    user_id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    token?: string;
}

export interface IUserSignIn {
    user_id?: string;
    username: string;
    email?: string;
    password: string;
    token?: string;
}

// {
//     "status": "success",
//     "data": {
//       "user_id": 15,
//       "name": "Edvaldo",
//       "username": "Domingos",
//       "email": "edvaldod@impact.com",
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInVzZXJfaWQiOjYsIm5hbWUiOiJ1c2VyMSIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE2MDUzNzYwNTIsImV4cCI6MTYwNTgwODA1Mn0.mKVJIi9Lps9gxurBQmI7iIitmHkYtIPhJoZZk3NgJUw"
//     }
//   }