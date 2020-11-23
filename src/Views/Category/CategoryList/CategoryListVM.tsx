import * as React from "react";
import * as _ from "lodash";
import { ICategory } from "../../../Domain/Entities/Category";
// import { AlertContext } from "../../../context_providers/alert_context";
import { MainContext } from "../../../context_providers/main_context";
import CategoryRepository from "../../../Data/Repositories/CategoryRepository";
import { lime } from "@material-ui/core/colors";

export default function CategoryListVM({ history, location }) {
  const [totalNumberOfRows, setNumberOfRows] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<ICategory[]>([] as ICategory[]);
  const [masterItems, setMasterItems] = React.useState<ICategory[]>([] as ICategory[]);
  const [searchText, setSearchText] = React.useState("");
  const [limit, setLimit] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const Alert = React.useContext(AlertContext);

  const categoryRepository = new CategoryRepository();

  async function loadCategories({ rowsPerPage = 5, page = 0 }) {
    setLoading(true);


    let fromRowNumber = rowsPerPage * page;
    if (fromRowNumber >= totalNumberOfRows) {
      fromRowNumber = 0;
    }


    let { categories, error, count } = await categoryRepository.loadCategories({
      name: searchText,
      limit: rowsPerPage,
      offset: fromRowNumber
    });

    setLoading(false);
    if (error) {
      // Alert.error(error.message);
      setErrorMessage(error.message)
      console.log(error)
      return;
    }

    if (categories.length === 0) {
      setRowsPerPage(5);
      setPage(0);
      setItems(categories);
      setMasterItems(categories);
      return;
    }

    setItems(categories);
    setMasterItems(categories);
    setNumberOfRows(count);
  }

  function onSelect(categoryId: string): void {
    history.push(`/category/${categoryId}/info`)
  }

  // function onAdd() {
  //   history.push("/category/new");
  // }

  return {
    totalNumberOfRows,
    isLoading,
    items,
    searchText,
    page,
    errorMessage,
    offset,
    rowsPerPage,
    setSearchText,
    setRowsPerPage,
    setOffset,
    setPage,
    loadCategories,
    onSelect,
  };
}
