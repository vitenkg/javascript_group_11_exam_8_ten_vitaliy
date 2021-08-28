import React, {useState} from 'react';
import axiosApi from "../../AxiosApi";
import './QuoteAdd.css';
import category from "../../config";

const QuoteAdd = ({history}) => {
    const [newQuote, setNewQuote] = useState('');

    const onSubmitHandle = async e => {
        e.preventDefault();
        console.log(newQuote.category);

        try {
            if (newQuote.category !== "all") {
                await axiosApi.post('/quotes.json', {
                    category: newQuote.category,
                    title: newQuote.title,
                    text: newQuote.text,
                });
            } else {
                alert('Выберите категорию');
            }
        } finally {
            history.replace('/');
        }

    };

    return (
        <form onSubmit={(e) => onSubmitHandle(e)}>
            <fieldset>
                <legend>введите сообщение</legend>

                <label>
                    Выберите категорию
                    <p>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            value={newQuote.category}
                            onChange={e => setNewQuote({...newQuote, category: e.target.value})}
                        >
                            {category.map(cat => (
                                <option value={cat.id}>{cat.title}</option>
                            ))
                            }
                        </select>
                    </p>
                </label>
                <label>
                    Автор
                    <p>
                        <input type="text" value={newQuote.title}
                               onChange={e => setNewQuote({...newQuote, title: e.target.value})}/>
                    </p>
                </label>
                <label>
                    <p>
                        Цитата
                        <textarea
                            rows="10"
                            cols="120"
                            value={newQuote.text}
                            onChange={e => setNewQuote({...newQuote, text: e.target.value})}
                        >

                    </textarea>
                    </p>
                </label>
                <button type="submit">Добавить</button>
            </fieldset>

        </form>
    );
};

export default QuoteAdd;