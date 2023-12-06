import S from './SettingPage.module.css';

import type {LoginInfo} from "../../config/type";
import type {Dispatch, FC, SetStateAction} from "react";

interface Props {
	setLogin: Dispatch<SetStateAction<boolean>>,
	setLoginInfo: Dispatch<SetStateAction<LoginInfo>>
}
const SettingPage: FC<Props> = ({ setLogin, setLoginInfo }) => {
    const handleLogout = () => {
        setLoginInfo({id: '', name: '', type: 'parents', academyName: '', groupName: ''});
        setLogin(false);
    };
	
    return (
        <div className={S['container']}>
            <h1 onClick={handleLogout}>Logout</h1>
        </div>
    );
};

export default SettingPage;
