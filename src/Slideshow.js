import React, { useState } from "react";
import arrow from "./arrow.png";

function Slideshow({ components }) {
    const [index, setIndex] = useState(0);

    function prevSlide() {
        setIndex( (prevIndex) => (prevIndex - 1 + components.length) % components.length );
    }

    function nextSlide() {
        setIndex( (prevIndex) => (prevIndex + 1) % components.length );
    }

    function setSlide(slide) {
        setIndex( slide );
    }

    const Slide = components[index];
    
    // const typeMapping = {
    //     0: 'Bar Chart',
    //     1: 'Scatter Plot',
    //     2: 'Box Plot'
    //   };
    // console.log(components);
    
    return (
        <div>
            <div className = "slideshow-container">
                {/* <button onClick = {prevSlide}>&lt;</button> */}
                <div className = "slide">
                    <img src={arrow} alt="larrow" className="arrow" id="larrow" onClick = {prevSlide}/>
                    {React.createElement(Slide.type, { ...Slide.props })}
                    <img src={arrow} alt="rarrow" className="arrow" id="rarrow" onClick = {nextSlide}/>
                </div>
                {/* <button onClick = {nextSlide}>&gt;</button> */}
            </div>
            <div className="pagination">
                {components.map((_, componentIndex) => (
                <span
                    key = {componentIndex}
                    className = {componentIndex === index ? "dot active" : "dot"}
                    // className = {componentIndex === index ? "indicator active" : "indicator"}
                    onClick = {() => setSlide(componentIndex)}
                ></span> // {typeMapping[componentIndex]}
                ))}
            </div>
        </div>
    );

};

export default Slideshow;