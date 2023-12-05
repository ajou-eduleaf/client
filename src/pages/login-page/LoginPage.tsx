import {useState} from "react";
import {useNavigate} from "react-router-dom";


import AppRoute from "../../config/route";
import {fetchData} from "../../utils/api";

import S from './LoginPage.module.css';

import type {LoginInfo} from "../../config/type";
import type {Dispatch, FC, SetStateAction} from "react";


interface props {
    setLogin: Dispatch<SetStateAction<boolean>>;
    setLoginInfo: Dispatch<SetStateAction<LoginInfo>>;
}

const LoginPage: FC<props> = ({ setLogin, setLoginInfo }) => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        id: '', pw: '', academyName: ''
    });
    
    const handleChangeLocation = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            academyName: e.target.value
        }));
    };
    
    const handleChangeId = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            id: e.target.value
        }));
    };
    
    const handleChangePw = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            pw: e.target.value
        }));
    };
    
    const handleGotoSignup = () => {
        navigate(AppRoute.SIGNUP);
    };
    const handleLogin = () => {
        void (async () => {
            try {
                const response = await fetchData<LoginInfo>(`/users/login?id=${account.id}&pw=${account.pw}&academyName=${account.academyName}`, 'POST');
                setLogin(true);
                setLoginInfo(response);
            } catch (e) {
                console.error(e);
            }
        })();
    };
    
    return (
        <div className={S['container']}>
            <span className={'mb-4'}>코딩학원 관리서비스<br/><b className={'bold'}>EduLeaf</b> 입니다</span>
            <input onChange={handleChangeLocation} placeholder={'학원을 입력해주세요.'} />
            <input onChange={handleChangeId} placeholder={'아이디를 입력해주세요.'} />
            <input onChange={handleChangePw} placeholder={'비밀번호를 입력해주세요.'} type={'password'} />
            <div className={S['btn-area']}>
                <button className={S['signup-btn']} onClick={handleGotoSignup}>회원가입</button>
                <button className={S['login-btn']} onClick={handleLogin}
                >로그인</button>
            </div>
        </div>
    );
};

export default LoginPage;
