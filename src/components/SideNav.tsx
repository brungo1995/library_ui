import * as React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import * as _ from "lodash";
import SideNavHeader from "./SideNavHeader";

const navItems = [{
    "path": "/category",
    "icon": "fa fa-trophy",
    "title": "Categories"
},
{
    "path": "/author",
    "icon": "fa fa-user",
    "title": "Authors"
},
{
    "path": "/book",
    "icon": "fa fa-book",
    "title": "Books"
}

]

interface props extends RouteComponentProps<any, any, any> { }

export default function Nav({ location }: props): JSX.Element {

    function isMatch(route: string) {
        if (_.startsWith(location.pathname, `${route}/`) || location.pathname === route) {
            return "active";
        }
        return "";
    }

    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <SideNavHeader />
                <ul className="nav metismenu scrollable" id="side-menu">
                    {navItems.map((item) => {
                        return (
                            <li key={item.path} className={isMatch(item.path)}>
                                <NavLink to={item.path}>
                                    <i className={item.icon} /> <span className="nav-label">{item.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
