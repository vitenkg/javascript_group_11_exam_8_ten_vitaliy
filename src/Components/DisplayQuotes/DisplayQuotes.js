import React, {useEffect, useState} from 'react';
import './DisplayQuotes.css';
import axiosApi from "../../AxiosApi";
import category from "../../config";
import {useHistory} from "react-router-dom";

const DisplayQuotes = ({query}) => {
    let history = useHistory();
    const [quotes, setQuotes] = useState(null);
    const [check, setCheck] = useState(false);
    let urlResponse = '/quotes.json';

    if (query) {
        urlResponse = '/quotes.json?orderBy="category"&equalTo="' + query + '"';
    }

    if (query === 'all') {
        urlResponse = '/quotes.json';
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosApi.get(urlResponse);
            const responseArray = [];
            // const [loading, setLoading] = useState()

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
    }, [check, urlResponse]);

    const onClickEditHandler = (id) => {
        history.replace('/quote/' + id + '/edit');
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