import React, {useEffect, useState} from 'react';
import './DisplayQuotes.css';
import axiosApi from "../../AxiosApi";
import category from "../../config";
import {useHistory} from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const DisplayQuotes = ({query}) => {
    let history = useHistory();
    let categoryTitle = '';
    category.forEach(cat => {
        if (cat.id === query) {
            categoryTitle = cat.title
        }
    });


    const [quotes, setQuotes] = useState(null);
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
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
            setLoading(true);

            Object.keys(response.data).forEach(id => {
                responseArray.push({
                    id,
                    title: response.data[id].title,
                    text: response.data[id].text
                })
            })
            setQuotes(responseArray);
            setCheck(false);
            setLoading(false);
        }

        fetchData().catch(console.error);
    }, [check, urlResponse]);

    const onClickEditHandler = (id) => {
        history.replace('/quote/' + id + '/edit');
    };

    const onClickRemoveHandler = async (id) => {
        const url = '/quotes/' + id + '.json';
        try {
            await axiosApi.delete(url);
            setLoading(true);
        } finally {
            setCheck(true);
            setLoading(false);
        }
    };

    if (loading) {
        return (
        <Spinner/>
        )
    } else {
        return quotes && (
            <div className="DisplayQuotes">
                <h3>{categoryTitle}</h3>
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
        )
    }
};

export default DisplayQuotes;