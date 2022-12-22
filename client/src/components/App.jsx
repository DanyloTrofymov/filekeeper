import React from 'react';
import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import components from './';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <components.Navbar />
                <div className="wrap">
                    <Switch>
                        <Route
                            path="/registration"
                            component={components.Registration}
                        />
                        <Route path="/login" component={components.Login} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
