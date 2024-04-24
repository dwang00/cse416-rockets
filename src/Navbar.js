import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1e1e1e",}}>
            <a className="navbar-brand" href="#" height={props.navbarHeight} onClick={() => props.setCurrState(null)}
                style={{color: "#f00840", fontWeight: "bold",}}>
                <img src={props.logo} width="auto" height={props.navbarHeight * 0.63} className="d-inline-block" alt="logo"/>
                <span className="align-middle">Home</span>
            </a>
            <div className="navbar-nav">
                <a className="nav-item nav-link" href="#" onClick={() => props.setCurrState("al")}>Alabama</a>
                <a className="nav-item nav-link" href="#" onClick={() => props.setCurrState("de")}>Delaware</a>
                {/* <a className="nav-item nav-link" href="#">Side-by-Side</a> */}
            </div>
        </nav>
    );
};

export default Navbar;