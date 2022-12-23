import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import components from './';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';
import Drive from './drive/Drive';
import { Redirect } from 'react-router-dom';
//import { logout } from '../reducers/user'

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.User.auth());
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <components.Navbar />
                <div className="wrap">
                    {!isAuth ?
                        <Switch>
                            <Route
                                path="/registration"
                                component={components.Registration}
                            />
                            <Route path="/login" component={components.Login} />
                            <Redirect to='/login'/>
                        </Switch>
                        :
                        <Switch>
                            <Route
                                exact path="/disk"
                                component={Drive}
                            />
                            <Redirect to='/disk'/>
                        </Switch>
                    }

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
