import React from "react";
import GetData from "./get_data";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';


function StateTab({components, navbarHeight}) {
    const height = window.innerHeight - navbarHeight;
    return (
        <div className="w-100 d-flex justify-content-center" style={{backgroundColor: "#333333", height: `${height}px`}}>
            {/* <GetData /> */}
            <Slideshow components={components} />
        </div>
    )
};

export default StateTab;