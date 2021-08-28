import React from 'react';
import './Quotes.css';
import DisplayCategory from "../../Components/DisplayCategory/DisplayCategory";
import DisplayQuotes from "../../Components/DisplayQuotes/DisplayQuotes";

const Quotes = () => {


    return (
        <div className="Main">
            <DisplayCategory/>
            <DisplayQuotes/>
        </div>
    );
};

export default Quotes;