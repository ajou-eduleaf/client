import React, {useEffect, useState} from 'react';
import './common/css/common.css';
import './common/css/reset.css';
import {Routes, Route, useNavigate} from "react-router-dom";

import AppRoute from "./config/route";
import LoginPage from "./pages/login-page/LoginPage";
import MainPage from "./pages/main-page/MainPage";

function App() {
    const [login, setLogin] = useState(false);
    
    return (
        <div className="App">
            <Routes>
                <Route path={AppRoute.LOGIN} element={<LoginPage setLogin={setLogin} />} />
                <Route path={AppRoute.MAIN} element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default App;
