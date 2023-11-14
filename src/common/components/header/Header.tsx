import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import AppRoute from "../../../config/route";

import S from './Header.module.css';

import type {JSX} from "react";


const LogoutHeader = () => {
    return (
        <div className={S['logout-header']}>
            <Logos />
            <span>로그인 필요</span>
        </div>
    );
};

const Logos = () => (
    <Link to={AppRoute.MAIN}>
        <div className={'flex items-center'}>
            <span className={S['title']}>EduLeaf</span>
            <img className={S['logo']} src={'logo.png'} />
        </div>
    </Link>
);

const Header = () => {
    const [retEl, setRetEl] = useState<JSX.Element>(<></>);
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === AppRoute.LOGIN) setRetEl(<LogoutHeader />);
    }, [location]);
    
    return (
        <header className={S['container']}>
            {retEl}
        </header>
    );
};

export default Header;
