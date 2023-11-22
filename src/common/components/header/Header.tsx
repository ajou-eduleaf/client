import {log} from "util";

import { useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import AppRoute from "../../../config/route";
import {jobFormatter} from "../../../utils/formatter";

import S from './Header.module.css';

import type {LoginInfo} from "../../../config/type";
import type {JSX,FC} from "react";


interface StudentsHeaderProps { loginInfo: LoginInfo }

const StudentHeader: FC<StudentsHeaderProps> = ({ loginInfo }) => {
    return (
        <div className={S['students-header']}>
            <Logos loginInfo={loginInfo} />
            <Menus />
            <Profile loginInfo={loginInfo} />
        </div>
    );
};


interface ParentsHeaderProps { loginInfo: LoginInfo }
const ParentsHeader: FC<ParentsHeaderProps> = ({ loginInfo }) => {
    return (
        <div className={S['parents-header']}>
            <Logos loginInfo={loginInfo} />
            <Profile loginInfo={loginInfo} />
        </div>
    );
};

interface TeacherHeaderProps { loginInfo: LoginInfo }
const TeacherHeader: FC<TeacherHeaderProps> = ({ loginInfo }) => {
    return (
        <div className={S['teacher-header']}>
            <Logos loginInfo={loginInfo} />
            <Menus />
            <Profile loginInfo={loginInfo} />
        </div>
    );
};

const LogoutHeader = () => {
    return (
        <div className={S['logout-header']}>
            <Logos />
            <span>로그인 필요</span>
        </div>
    );
};

interface LogosProps {loginInfo?: LoginInfo}
const Logos: FC<LogosProps> = ({ loginInfo }) => (
    <Link to={AppRoute.MAIN}>
        <div className={'flex items-center'}>
            <span className={S['title']}>EduLeaf</span>
            <img className={S['logo']} src={'logo.png'} />
            {loginInfo?.location && <span>@{loginInfo.location}</span>}
        </div>
    </Link>
);

const Menus = () => (
    <div className={S['menus']}>
        <Link to={AppRoute.RANK}>
            <span>🏆 Ranking</span>
        </Link>
        <Link to={AppRoute.MAIN}>
            <span>⚙️ Settings</span>
        </Link>
        <a href={'https://www.acmicpc.net/'} target={'_blank'} rel="noreferrer">
            <span>🔀 BOJ</span>
        </a>
    </div>
);

interface ProfileProps { loginInfo: LoginInfo }
const Profile: FC<ProfileProps> = ({ loginInfo }) => {
    if (!Object.keys(loginInfo)) return <></>;
    
    return (
        <div className={'flex items-center'}>
            <span className={'mr-2'}>{loginInfo.name}</span>
            <span className={'bold underline'}>{jobFormatter(loginInfo.type)}</span>
            <img className={S['profile-image']} src={`images/${loginInfo.type}.png`}/>
        </div>
    );
};

interface props {
    loginInfo: LoginInfo;
}

const Header: FC<props> = ({ loginInfo }) => {
    const [retEl, setRetEl] = useState<JSX.Element>(<></>);
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === AppRoute.LOGIN) setRetEl(<LogoutHeader />);
        if (location.pathname === AppRoute.MAIN) {
            if (loginInfo.type === 'teacher') setRetEl(<TeacherHeader loginInfo={loginInfo} />);
            if (loginInfo.type === 'parents') setRetEl(<ParentsHeader loginInfo={loginInfo} />);
            if (loginInfo.type === 'student') setRetEl(<StudentHeader loginInfo={loginInfo} />);
        }
    }, [location]);
    
    return (
        <header className={S['container']}>
            {retEl}
        </header>
    );
};

export default Header;
