import React, { useState, useEffect, createContext } from 'react';
import { ICategory } from "../Domain/Entities/Category"
import { IAuthor } from "../Domain/Entities/Author"
// import { ICategory } from "../Domain/Entities/Category"
import { useHistory, useParams, useLocation } from "react-router-dom";
import CategoryRepository from "../Data/Repositories/CategoryRepository";
import AuthorRepository from "../Data/Repositories/AuthorRepository";

export const MainContext = createContext(null);

export function MainDataProvider({ children = null }: React.PropsWithChildren<{}>) {


    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const history = useHistory();
    const categoryRepository = new CategoryRepository();
    const authorRepository = new AuthorRepository();

    useEffect(() => {
        if (getToken()) {
            loadCategories();
            loadAuthors()
        }
    }, [])


    async function loadCategories() {
        try {
            let { categories, error } = await categoryRepository.loadCategories({ limit: -1, offset: 0, name: "" })
            setCategories(categories)
        } catch (error) {
        }
    }

    async function loadAuthors() {
        try {
            let { authors, error } = await authorRepository.loadAuthors({ limit: -1, offset: 0, first_name: "", last_name: "" })
            setAuthors(authors)
        } catch (error) {
        }
    }

    function getToken() {
        let token = localStorage.getItem("token");
        return token || null;

    }

    return (
        <MainContext.Provider
            value={{
                setCategories,
                setAuthors,
                authors,
                categories,
            }}>
            {children}
        </MainContext.Provider>
    );

};