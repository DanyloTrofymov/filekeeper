import React from 'react';
import './app.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ErrorModal from '../utils/modal/ErrorModal';
import Navbar from '../components/navbar/Navbar';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import PdfView from './views/PDF/PdfView';
import Drive from '../components/drive/Drive';
import ProtectedRoute from './auth/ProtectedRoute';
//import actions from '../actions';
//import { auth } from '../actions/user/auth';
//import { useDispatch, useSelector } from 'react-redux';
//import {setPopupDisplay} from "../reducers/file";
// import Drive from '../components/drive/Drive';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <div className="wrap">
                    <Switch>
                        <Route path="/registration" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/viewPDF" component={PdfView} />
                        <ProtectedRoute path="/drive" component={Drive} />
                        <Redirect to="/login" />
                    </Switch>
                </div>
                <ErrorModal />
            </div>
        </BrowserRouter>
    );
}

export default App;
