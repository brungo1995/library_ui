import * as React from "react";

export default function TopNav() {
    return (
        <div className="row border-bottom">
            <nav
                className="navbar navbar-static-top"
                role="navigation"
                style={{
                    marginBottom: 0,
                    backgroundColor: "white",
                    height: "43px",
                    justifyContent: "flex-end",
                }}
            >
                <ul
                    className="nav navbar-top-links navbar-right"
                    style={{ height: "30px", padding: "0", marginTop: 4 }}
                >
                    <li>
                        <span className="m-r-sm text-muted welcome-message">
                            {`Welcome to the Library System`}
                        </span>
                    </li>
                    <li>
                        <button className="btn" onClick={() => { }}>
                            <i className="fa fa-sign-out" />{"Log Out"}</button>
                        {/* <button className="btn" onClick={logout}>
                <i className="fa fa-sign-out" />{"Log Out"}</button> */}
                    </li>
                </ul>
            </nav>
        </div>
    );
}
