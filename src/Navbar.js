import React from "react";

function Navbar(props) {

    // console.log(props.currTab);

    const fullNames = {
        "summary" : "State Summary",
        "analysis" : "Voter Analysis",
        "districts" : "Opportunity Districts",
        "plans" : "Generated Plans"
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1e1e1e",}}>
            <a className="navbar-brand" href="#" height={props.navbarHeight} onClick={() => props.setCurrState(null)}
                style={{color: "#f00840", fontWeight: "bold",}}>
                <img src={props.logo} width="auto" height={props.navbarHeight * 0.63} className="d-inline-block" alt="logo"/>
            </a>
            <div className="navbar-nav">
                <span className="nav-item nav-link" onClick={() => props.setCurrState("al")}>Alabama</span>
                <span className="nav-item nav-link" onClick={() => props.setCurrState("de")}>Delaware</span>
                <li class="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {fullNames[props.currTab]}
                        {/* TODO add tab for home*/}
                    </span>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li class="dropdown-item" value="summary" onClick={() => props.setCurrTab("summary")}>State Summary</li>
                        <li class="dropdown-item" value="analysis" onClick={() => props.setCurrTab("analysis")}>Voter Analysis</li>
                        <li class="dropdown-item" value="districts" onClick={() => props.setCurrTab("districts")}>Opportunity Districts</li>
                        <li class="dropdown-item" value="plans" onClick={() => props.setCurrTab("plans")}>Generated Plans</li>
                    </ul>
                </li>
                {/* <a className="nav-item nav-link" href="#">Side-by-Side</a> */}
            </div>
            
        </nav>
    );
};

export default Navbar;