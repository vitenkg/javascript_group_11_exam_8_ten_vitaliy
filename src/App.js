import './App.css';
import {NavLink, Route, Switch} from "react-router-dom";
import Quotes from "./Conteiner/Quotes/Quotes";
import QuoteAdd from "./Conteiner/QuoteAdd/QuoteAdd";
import Quote from "./Conteiner/Quote/Quote";

function App() {
    return (
        <div className="Container">
            <div className="Header">
                <p className="NaviHeader"><NavLink exact to="/" style={{textDecoration: 'none'}}>Quotes Central</NavLink></p>
                <ul className="HeaderUl">
                    <li className="HeaderLi"><NavLink exact to="/">Quotes</NavLink></li>
                    <li className="HeaderLi"><NavLink to="/quote/add">Submit new quote</NavLink></li>
                </ul>
            </div>
            <Switch>
                <Route path="/" exact component={Quotes}/>
                <Route path="/quote/add" component={QuoteAdd}/>
                <Route path="/quote/:id/edit" component={Quote}/>
                <Route path="/quotes/:id" component={Quotes}/>
                <Route render={()=><h1>NotFound</h1>}/>
            </Switch>
        </div>
    );
}

export default App;
