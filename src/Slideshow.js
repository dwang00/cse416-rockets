
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Slideshow({ components }) {
    
    return (
        <div id="carouselExampleIndicators" className="carousel slide align-self-center" data-interval="false" style={{height: "100%", width: "100%"}}>
            <ol className="carousel-indicators" style={{bottom: "-5%"}}>
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner" style={{height: "100%", backgroundColor: '#e6e6e6', borderStyle: 'solid',}}>
                <div className="carousel-item active" style={{height: "100%"}}>
                    {React.createElement(components[0].type, { ...components[0].props })}
                </div>
                <div className="carousel-item" style={{height: "100%"}}>
                    {React.createElement(components[1].type, { ...components[1].props })}
                </div>
                <div className="carousel-item" style={{height: "100%"}}>
                    {React.createElement(components[2].type, { ...components[2].props })}
                </div>
                <div className="carousel-item" style={{height: "100%"}}>
                    {React.createElement(components[3].type, { ...components[3].props })}
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{left: "-3%"}}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{right: "-3%"}}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );

}
export default Slideshow;