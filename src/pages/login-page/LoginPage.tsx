import {useNavigate} from "react-router-dom";


import {TEACHER_DUMMY} from "./config/dummy";
import S from './LoginPage.module.css';

import type {LoginInfo} from "../../config/type";
import type {Dispatch, FC, SetStateAction} from "react";


interface props {
    setLogin: Dispatch<SetStateAction<boolean>>;
    setLoginInfo: Dispatch<SetStateAction<LoginInfo>>;
}

const LoginPage: FC<props> = ({ setLogin, setLoginInfo }) => {
    const navigate = useNavigate();
    
    const handleGotoSignup = () => {
    };
    const handleLogin = () => {
        // TODO:: Login
        setLogin(true);
        setLoginInfo(TEACHER_DUMMY);
    };
    
    return (
        <div className={S['container']}>
            <span className={'mb-4'}>코딩학원 관리서비스<br/><b className={'bold'}>EduLeaf</b> 입니다</span>
            <input placeholder={'학원을 입력해주세요.'} />
            <input placeholder={'아이디를 입력해주세요.'} />
            <input placeholder={'비밀번호를 입력해주세요.'} type={'password'} />
            <div className={S['btn-area']}>
                <button className={S['signup-btn']} onClick={handleGotoSignup}>회원가입</button>
                <button className={S['login-btn']} onClick={handleLogin}
                >로그인</button>
            </div>
        </div>
    );
};

export default LoginPage;
