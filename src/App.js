import './App.css';
import {NavLink, Route, Switch} from "react-router-dom";
import Quotes from "./Conteiner/Quotes/Quotes";
import QuoteAdd from "./Conteiner/QuoteAdd/QuoteAdd";

function App() {
    return (
        <div className="Container">
            <div className="Header">
                <p className="NaviHeader"><NavLink exact to="/" style={{textDecoration: 'none'}}>Quotes Central</NavLink></p>
                <ul>
                    <li><NavLink exact to="/">Quotes</NavLink></li>
                    <li><NavLink to="/quote/add">Submit new quote</NavLink></li>
                </ul>
            </div>
            <Switch>
                <Route path="/" exact component={Quotes}/>
                <Route path="/quote/add" component={QuoteAdd}/>
            </Switch>
        </div>
    );
}

export default App;
