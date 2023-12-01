import {useState} from "react";
import {useNavigate} from "react-router-dom";


import AppRoute from "../../config/route";
import {fetchData} from "../../utils/api";

import S from './SignupPage.module.css';

import type {LoginInfo} from "../../config/type";
import type {FC} from "react";


const SignupPage: FC = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        name: '', id: '', pw: '', academyName: '', group: '', age: 0, bojId: ''
    });
    
    const handleChangeName = (e: any) => {
        console.log(e.target.value);
        setAccount((prev) => ({
            ...prev,
            name: e.target.value
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
    
    const handleChangeLocation = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            academyName: e.target.value
        }));
    };
    
    const handleChangeGroup = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            group: e.target.value
        }));
    };
    
    const handleChangeAge = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            age: e.target.value
        }));
    };
    
    const handleChangeBojId = (e: any) => {
        setAccount((prev) => ({
            ...prev,
            bojId: e.target.value
        }));
    };
    
    const handleSignup = () => {
        void (async () => {
            try {
                await fetchData<LoginInfo>(`/users/signup/student?name=${account.name}&studentId=${account.id}&studentPw=${account.pw}&academyName=${account.academyName}&groupName=${account.group}&age=${account.age}&bojId=${account.bojId}`, 'POST');
                navigate(AppRoute.LOGIN);
            } catch (e) {
                console.error(e);
            }
        })();
    };
    
    return (
        <div className={S['container']}>
            <span className={'mb-4'}><b className={'bold'}>회원가입</b></span>
            <input onChange={handleChangeName} placeholder={'이름을 입력해주세요.'} />
            <input onChange={handleChangeId} placeholder={'아이디를 입력해주세요.'} />
            <input onChange={handleChangePw} placeholder={'비밀번호를 입력해주세요.'} type={'password'} />
            <input onChange={handleChangeLocation} placeholder={'학원을 입력해주세요.'} />
            <input onChange={handleChangeGroup} placeholder={'반 이름을 입력해주세요.'} />
            <input onChange={handleChangeAge} placeholder={'나이를 입력해주세요.'} />
            <input onChange={handleChangeBojId} placeholder={'백준온라인 아이디를 입력해주세요.'} />
            <div className={S['btn-area']}>
                <button className={S['signup-btn']} onClick={handleSignup}>완료</button>
            </div>
        </div>
    );
};

export default SignupPage;
