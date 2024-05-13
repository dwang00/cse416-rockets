import React from "react";

function Navbar(props) {

    // console.log(props.currTab);

    const fullNames = {
        "summary" : "State Summary",
        "analysis" : "Voter Analysis",
        "districts" : "Opportunity Districts",
        "plans" : "Generated Plans",
        "select" : "Select a State"
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1e1e1e",}}>
            <a className="navbar-brand" href="#" height={props.navbarHeight} onClick={() => {props.setCurrState(null); props.setCurrTab("select")}}
                style={{color: "#f00840", fontWeight: "bold",}}>
                <img src={props.logo} width="auto" height={props.navbarHeight * 0.63} className="d-inline-block" alt="logo"/>
            </a>
            <div className="navbar-nav">
                <span className="nav-item nav-link" onClick={() => {props.setCurrState("al", props.setCurrTab("summary"));}} 
                    style={{
                        cursor:"pointer", 
                        color: props.currState=="al" ? "#f00840" : "white",
                        opacity: props.currState=="al" ? "1" : ".55",
                        fontWeight: props.currState=="al" ? "bold" : "normal"
                    }}>
                    Alabama</span>
                <span className="nav-item nav-link" onClick={() => {props.setCurrState("de"); props.setCurrTab("summary");}} 
                    style={{
                        cursor:"pointer", 
                        color: props.currState=="de" ? "#f00840" : "white",
                        opacity: props.currState=="de" ? "1" : ".55",
                        fontWeight: props.currState=="de" ? "bold" : "normal"
                    }}>
                    Delaware</span>
                {props.currTab != "select" && <li class="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {fullNames[props.currTab]}
                    </span>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li class="dropdown-item" value="summary" onClick={() => props.setCurrTab("summary")} style={{cursor:"pointer"}}>State Summary</li>
                        <li class="dropdown-item" value="analysis" onClick={() => props.setCurrTab("analysis")} style={{cursor:"pointer"}}>Voter Analysis</li>
                        <li class="dropdown-item" value="districts" onClick={() => props.setCurrTab("districts")} style={{cursor:"pointer"}}>District Plan Analysis</li>
                        {/* <li class="dropdown-item" value="plans" onClick={() => props.setCurrTab("plans")} style={{cursor:"pointer"}}>Generated Plans</li> */}
                    </ul>
                </li>}
                {/* <a className="nav-item nav-link" href="#">Side-by-Side</a> */}
            </div>
            
        </nav>
    );
};

export default Navbar;