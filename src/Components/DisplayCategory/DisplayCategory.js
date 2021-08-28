import React from 'react';
import {Link} from "react-router-dom";
import './DisplayCategory.css';
import category from "../../config";

const DisplayCategory = () => {

    return (
            <div className="LeftPanel">
                <ul  className="CategoryUl">
                    {category.map(pos => (
                            <li
                                key={pos.id}
                                className="CategoryLi"
                            ><Link
                                to="/"
                                className="CategoryA"
                            >{pos.title}</Link></li>
                        )
                    )}
                </ul>
            </div>
    );
};

export default DisplayCategory;