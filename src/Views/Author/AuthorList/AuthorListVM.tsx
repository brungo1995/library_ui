import * as React from "react";
import * as _ from "lodash";
import { IAuthor } from "../../../Domain/Entities/Author";
// import { AlertContext } from "../../../context_providers/alert_context";
import AuthorRepository from "../../../Data/Repositories/AuthorRepository";
import { lime } from "@material-ui/core/colors";

export default function AuthorListVM({ history, location }) {
  const [totalNumberOfRows, setNumberOfRows] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<IAuthor[]>([] as IAuthor[]);
  const [masterItems, setMasterItems] = React.useState<IAuthor[]>([] as IAuthor[]);
  const [authorFirstNameSearchText, setAuthorFirstNameSearchText] = React.useState("");
  const [authorLastNameSearchText, setAuthorLastNameSearchText] = React.useState("");
  const [limit, setLimit] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const Alert = React.useContext(AlertContext);

  const authorRepository = new AuthorRepository();

  async function loadAuthors({ rowsPerPage = 5, page = 0 }) {
    setLoading(true);

    let fromRowNumber = rowsPerPage * page;
    if (fromRowNumber >= totalNumberOfRows) {
      fromRowNumber = 0;
    }

    // console.log(`offset : => `, fromRowNumber)
    // console.log(`Rows per Page or Limit : => `, rowsPerPage)
    // console.log(`Name : => `, authorFirstNameSearchText)



    let { authors, error, count } = await authorRepository.loadAuthors({
      first_name: authorFirstNameSearchText,
      last_name: authorLastNameSearchText,
      limit: rowsPerPage,
      offset: fromRowNumber
    });

    setLoading(false);
    if (error) {
      // Alert.error(error.message);
      console.log(error)
      return;
    }

    if (authors.length === 0) {
      setRowsPerPage(5);
      setPage(0);
      return;
    }

    setItems(authors);
    setMasterItems(authors);
    setNumberOfRows(count);
  }

  function onSelect(authorId: string): void {
    history.push(`/author/${authorId}/info`)
  }


  function onAdd() {
    history.push("/author/new");
  }

  return {
    totalNumberOfRows,
    isLoading,
    items,
    authorFirstNameSearchText,
    page,
    offset,
    rowsPerPage,
    authorLastNameSearchText,
    onAdd,
    setAuthorLastNameSearchText,
    setAuthorFirstNameSearchText,
    setRowsPerPage,
    setOffset,
    setPage,
    loadAuthors,
    onSelect,
  };
}
