import React, {useEffect, useState} from 'react';
import './DisplayQuotes.css';
import axiosApi from "../../AxiosApi";
import category from "../../config";
import {useHistory} from "react-router-dom";

const DisplayQuotes = () => {
    let history = useHistory();
    const [quotes, setQuotes] = useState(null);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosApi.get('/quotes.json');
            const responseArray = [];

            Object.keys(response.data).forEach(id => {
                responseArray.push({
                    id,
                    title: response.data[id].title,
                    text: response.data[id].text
                })
            })
            setQuotes(responseArray);
            setCheck(false);
        }

        fetchData().catch(console.error);
    }, [check]);

    const onClickEditHandler = (id) => {
        history.replace('/quote/' + id);
    };

    const onClickRemoveHandler = async (id) => {
        console.log(id);
        const url = '/quotes/' + id + '.json';
        try {
            await axiosApi.delete(url);
        } finally {
            setCheck(true);
        }
    };

    return quotes && (
        <div className="DisplayQuotes">
            <h3>{category[0].title}</h3>
            {quotes.map(quote => (
                    <div
                        key={quote.id}
                        id={quote.id}
                        className="Quote"

                    >
                        <p className="Title">Автор: {quote.title}</p>
                        <p>{quote.text}</p>
                        <button
                            type="button"
                            className="Btn"
                            onClick={() => onClickEditHandler(quote.id)}
                        >
                            Редактировать >>
                        </button>
                        <button
                            type="button"
                            className="Btn"
                            onClick={() => onClickRemoveHandler(quote.id)}
                        >
                            Удалить >>
                        </button>
                    </div>
                )
            )
            }
        </div>
    );
};

export default DisplayQuotes;