import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import components from './';
import {useDispatch,  useSelector } from "react-redux";
import {auth} from "../actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

   useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <components.Navbar />
                <div className="wrap">
                    {!isAuth &&
                    <Switch>
                    <Route
                        path="/registration"
                        component={components.Registration}
                    />
                    <Route path="/login" component={components.Login} />
                </Switch>}
                {isAuth && <Route path="/login" component={components.Logout} /> }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
