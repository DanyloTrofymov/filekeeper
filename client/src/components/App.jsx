import React from 'react';
import './app.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ErrorModal from '../utils/modal/ErrorModal';
import Navbar from '../components/navbar/Navbar';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import PdfView from './views/PdfView';
import Drive from '../components/drive/Drive';
import ProtectedRoute from './auth/ProtectedRoute';
import DocView from './views/DocView';
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
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/registration"
                            element={<Registration />}
                        />
                        <Route path="/viewPDF" element={<PdfView />} />
                        <Route path="/viewDoc" element={<DocView />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                        <Route
                            path="/drive"
                            element={
                                <ProtectedRoute>
                                    <Drive />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <ErrorModal />
            </div>
        </BrowserRouter>
    );
}

export default App;
