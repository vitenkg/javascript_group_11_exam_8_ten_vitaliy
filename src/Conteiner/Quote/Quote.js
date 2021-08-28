import React, {useEffect, useState} from 'react';
import './Quote.css';
import axiosApi from "../../AxiosApi";
import category from "../../config";

const Quote = ({match, history}) => {
    const [quote, setQuote] = useState(null);
    const url = '/quotes/' + match.params.id + '.json';

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosApi.get(url);
            setQuote({title: response.data.title, text: response.data.text, category: response.data.category});
        }

        fetchData().catch(console.error);
    }, [url]);

    const onSubmitHandle = async e => {
        e.preventDefault();
        try {
            await axiosApi.put(url, {
                category: quote.category,
                title: quote.title,
                text: quote.text
            });
        } finally {
            history.replace('/');
        }

    };

    return quote && (
        <form onSubmit={e => onSubmitHandle(e)}>
            <fieldset>
                <legend>Внесите Изменения</legend>

                <label>
                    Категория
                    <p>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={quote.category}
                            onChange={e => setQuote({...quote, category: e.target.value})}
                        >
                            {category.map(cat => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >{cat.title}</option>
                            ))
                            }
                        </select>
                    </p>
                </label>

                <p><input
                    type="text"
                    value={quote.title}
                    onChange={e => setQuote({...quote, title: e.target.value})}/></p>
                <p>
                    <textarea
                        rows="10"
                        cols="120"
                        value={quote.text}
                        onChange={e => setQuote({...quote, text: e.target.value})}
                    >

                    </textarea>
                </p>
                <button type="submit">Изменить</button>
            </fieldset>
        </form>
    );
};

export default Quote;