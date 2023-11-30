import React, {useEffect, useState} from 'react';
import './common/css/common.css';
import './common/css/reset.css';
import {Routes, Route, useNavigate} from "react-router-dom";

import Header from "./common/components/header/Header";
import AppRoute from "./config/route";
import {TEACHER_DUMMY} from "./pages/login-page/config/dummy";
import LoginPage from "./pages/login-page/LoginPage";
import MainPage from "./pages/main-page/MainPage";
import RankPage from "./pages/rank-page/RankPage";
import SignupPage from "./pages/signup-page/SignupPage";

import type {LoginInfo} from "./config/type";

function App() {
    const [login, setLogin] = useState(false);
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({id: '', name: '', type: 'parents', academyName: '', groupName: ''});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (login) navigate(AppRoute.MAIN);
    }, [login]);
    
    useEffect(() => {
        setLogin(true);
        setLoginInfo(TEACHER_DUMMY);
    }, []);
    
    return (
        <div className="App">
            <Header loginInfo={loginInfo} />
            <Routes>
                <Route path={AppRoute.LOGIN} element={<LoginPage setLogin={setLogin} setLoginInfo={setLoginInfo} />} />
                <Route path={AppRoute.SIGNUP} element={<SignupPage />} />
                <Route path={AppRoute.MAIN} element={<MainPage loginInfo={loginInfo} />} />
                <Route path={AppRoute.RANK} element={<RankPage loginInfo={loginInfo} />} />
            </Routes>
        </div>
    );
}

export default App;
