import * as React from "react";
import { Route } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CategoryList from "./CategoryList/CategoryListView";
// import CategoryDetail from "./CategoryDetail/CategoryDetailView";
// import CategoryInfo from "./CategoryInfo/CategoryInfoView";

function CategoryRouter() {
    return (
        <>
            <div className="fh-breadcrumb">
                <Route path="/category" component={CategoryList} />
                <div className="full-height">
                    <Row className="h-100">
                        {/* <Col md={12} className="p-0 h-100">
              <Route path="/category/:category_id" exact component={CategoryDetail} />
              <Route path="/category/:category_id/info" exact component={CategoryInfo} />
            </Col> */}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default CategoryRouter;
