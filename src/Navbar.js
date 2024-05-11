import React from "react";

function Navbar(props) {

    // console.log(props.currTab);
    
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
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Figure out how to display current tab name
                        {/* TODO */}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li class="dropdown-item" value="summary"> <a onClick={() => props.setCurrTab("summary")}>State Summary</a></li>
                        <li class="dropdown-item" value="analysis"> <a onClick={() => props.setCurrTab("analysis")}> Voter Analysis</a></li>
                        <li class="dropdown-item" value="districts"> <a onClick={() => props.setCurrTab("districts")}> Opportunity Districts</a></li>
                        <li class="dropdown-item" value="plans"> <a onClick={() => props.setCurrTab("plans")}>Generated Plans</a></li>
                    </ul>
                </li>
                {/* <a className="nav-item nav-link" href="#">Side-by-Side</a> */}
            </div>
            
        </nav>
    );
};

export default Navbar;