import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
import { ICategory } from "../../../Domain/Entities/Category";
import { findParams } from "../../../utilities/utilities";
// import useVM from "./CategoryListVM";
import SearchBar from "../../../components/SearchBar";
import ListItemView from "../../../components/ListView";
import { NavLink, RouteComponentProps } from "react-router-dom";

interface props extends RouteComponentProps<any, any, any> { }





function CategoryListView({ history, match, location }: props): JSX.Element {
    const reloadParent = location.state && location.state["reloadParent"];
    const params = findParams(location.pathname, "/category/:category_id");
    // const { count, isLoading, items, searchText, loadCategorys, onAdd, onSearch, onSelect } = useVM({
    //     history,
    //     location,
    // });
    // const heading = `Categories (${count})`;
    const heading = `Categories (${15})`;

    React.useEffect(() => {
        // loadCategorys();
    }, []);

    React.useEffect(() => {
        // if (reloadParent) {
        //     loadCategorys();
        // }
    }, [location.pathname]);

    return (
        <div className="fh-column">
            <Row className="column-header">
                <Col md={10} className="pr-0">
                    {/* {isLoading ? (
                        <strong>
                            {`Loading Categorys`}
                            <i className="fa fa-spinner3 fa-spin ml-1" />
                        </strong>
                    ) : ( */}
                    <strong>{heading}</strong>
                    {/*  )} */}
                </Col>
                <Col md={2} className="pl-0 text-right">
                    {/* <button onClick={onAdd} className="btn btn-add" title="Add" name="Add"> */}
                    <button onClick={() => { }} className="btn btn-add" title="Add" name="Add">
                        <i className="fa fa-plus" />
                    </button>
                </Col>
            </Row>

            <SearchBar
                title="Search Category"
                // value={searchText}
                value={""}
                // onChange={(e) => onSearch(e.target.value)}
                onChange={(e) => { }}
            />

            <ListItemView
                // data={items}
                data={data}
                // fetchingData={isLoading}
                fetchingData={false}
                ItemTemplate={(item: ICategory) => (
                    // <li onClick={() => onSelect(item._id)} className="list-group-item">
                    <li onClick={() => { }} className="list-group-item">
                        <div
                            className={
                                params && params["category_id"] === item.category_id ? "nav-link active p-3" : "nav-link p-3"
                            }
                        >
                            <Row className="pl-3">
                                <Col md={12} className="truncate-string" title={item.name}>
                                    <strong>{item.name}</strong>
                                </Col>
                            </Row>
                        </div>
                    </li>
                )}
            />
        </div>
    );
}

export default CategoryListView;


const data = [
    {
        "category_id": 1,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 10,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 100,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1000,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 11,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 111,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1111,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 12,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 122,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1222,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 13,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 133,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 1333,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    },
    {
        "category_id": 14,
        "name": "Action",
        "description": "A film with a fast-moving plot , usually containing scenes of violence ",
        "operation_by_user": "Domingos"
    }
]