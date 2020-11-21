import * as React from "react";
import * as _ from "lodash";
import { IBook, IGetBooksResponse, IBookResponseCollection } from "../../../Domain/Entities/Book";
// import { AlertContext } from "../../../context_providers/alert_context";
import BookRepository from "../../../Data/Repositories/BookRepository";
import { lime } from "@material-ui/core/colors";

export default function BookListVM({ history, location }) {
  const [totalNumberOfRows, setNumberOfRows] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  // const [items, setItems] = React.useState<IBook[]>([] as IBook[]);
  // const [masterItems, setMasterItems] = React.useState<IBook[]>([] as IBook[]);
  const [items, setItems] = React.useState<IBookResponseCollection[]>([] as IBookResponseCollection[]);
  const [masterItems, setMasterItems] = React.useState<IBookResponseCollection[]>([] as IBookResponseCollection[]);
  const [author_first_name, setAuthorFirstName] = React.useState("");
  const [author_last_name, setAuthorLastName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [book_name, setBookName] = React.useState("");
  const [isbn_number, setIsbnNumber] = React.useState("");
  const [year_published, setYearPublished] = React.useState("");
  const [limit, setLimit] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const Alert = React.useContext(AlertContext);

  const bookRepository = new BookRepository();

  async function loadBooks({ rowsPerPage = 5, page = 0 }) {
    setLoading(true);

    let fromRowNumber = rowsPerPage * page;
    if (fromRowNumber >= totalNumberOfRows) {
      fromRowNumber = 0;
    }

    let { data, error, count } = await bookRepository.loadBooks({
      author_first_name,
      author_last_name,
      category,
      book_name,
      isbn_number,
      year_published,
      limit: rowsPerPage,
      offset: fromRowNumber
    });

    setLoading(false);
    if (error) {
      // Alert.error(error.message);
      console.log(error)
      return;
    }


    if (data.length === 0) {
      setRowsPerPage(5);
      setPage(0);
      setItems(data);
      setMasterItems(data);
      return;
    }

    setItems(data);
    setMasterItems(data);
    setNumberOfRows(count);
  }

  function onSelect(bookId: string): void {
    history.push(`/book/${bookId}/info`)
  }


  function onAdd() {
    history.push("/book/new");
  }



  return {
    totalNumberOfRows,
    isLoading,
    items,
    author_first_name,
    author_last_name,
    category,
    book_name,
    isbn_number,
    year_published,
    page,
    offset,
    rowsPerPage,
    onAdd,
    setRowsPerPage,
    setOffset,
    setPage,
    loadBooks,
    onSelect,
    setAuthorFirstName,
    setAuthorLastName,
    setCategory,
    setBookName,
    setIsbnNumber,
    setYearPublished
  };
}
