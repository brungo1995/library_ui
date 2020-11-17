import * as React from "react";
var Capitalize = require('lodash.capitalize');

export default function SideNavHeader() {
    return (
        <div className="nav-header" style={{ height: "156px" }}>
            <div className="dropdown profile-element">
                <div className="profile-pic-container">
                    <i className="fa fa-user" />
                </div>
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                    <span className="block m-t-xs font-bold">edvaldo@gmail.com</span>
                    <span className="block m-t-xs font-bold text-muted">Edvaldo</span>
                    <span className="text-muted text-xs block" style={{ fontSize: 9 }} >
                        {Capitalize("USER")}
                    </span>
                </a>
            </div>
            <div className="logo-element">ERP</div>
        </div >
    );
}
