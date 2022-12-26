import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import components from './';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../utils/modal/ErrorModal';
//import actions from '../actions';
import { auth } from '../actions/user/auth';
import Drive from './drive/Drive';
//import {setPopupDisplay} from "../reducers/file";
//import ErrorModal from '../utils/modal/ErrorModal';

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <components.Navbar />
                <div className="wrap">
                    {!isAuth ? (
                        <Switch>
                            <Route
                                path="/registration"
                                component={components.Registration}
                            />
                            <Route path="/login" component={components.Login} />
                            <Redirect to="/login" />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/disk" component={Drive} />
                            <Redirect to="/disk" />
                        </Switch>
                    )}
                </div>
                <ErrorModal />
            </div>
        </BrowserRouter>
    );
}

export default App;
