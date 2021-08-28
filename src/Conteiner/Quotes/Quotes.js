import React from 'react';
import './Quotes.css';
import DisplayCategory from "../../Components/DisplayCategory/DisplayCategory";
import DisplayQuotes from "../../Components/DisplayQuotes/DisplayQuotes";

const Quotes = ({match}) => {
    return (
        <div className="Main">
            <DisplayCategory/>
            <DisplayQuotes
                query={match.params.id}
            />
        </div>
    );
};

export default Quotes;