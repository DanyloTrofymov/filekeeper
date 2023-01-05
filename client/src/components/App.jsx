import React from 'react';
import './app.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ErrorModal from '../utils/modal/ErrorModal';
import Navbar from '../components/navbar/Navbar';
import Registration from '../components/auth/Registration';
import Login from '../components/auth/Login';
import Drive from '../components/drive/Drive';
import PdfView from './views/doc/PdfView';
import ProtectedRoute from './auth/ProtectedRoute';
import DocView from './views/doc/DocView';
import AudioView from './views/audio/AudioView';
import PicView from './views/doc/PicView';
import VideoView from './views/video/VideoView';

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
                        <Route
                            path="/viewAudio"
                            element={
                                <ProtectedRoute>
                                    <AudioView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/viewPDF"
                            element={
                                <ProtectedRoute>
                                    <PdfView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/viewDoc"
                            element={
                                <ProtectedRoute>
                                    <DocView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/viewVideo"
                            element={
                                <ProtectedRoute>
                                    <VideoView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/viewPhoto"
                            element={
                                <ProtectedRoute>
                                    <PicView />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/drive"
                            element={
                                <ProtectedRoute>
                                    <Drive />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/drive" />} />
                    </Routes>
                </div>
                <ErrorModal />
            </div>
        </BrowserRouter>
    );
}

export default App;
