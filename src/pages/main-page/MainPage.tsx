
import S from "./MainPage.module.css";
import TalkBox from "./modules/talk-box/TalkBox";

import type {LoginInfo} from "../../config/type";
import type {FC} from "react";

interface Props { loginInfo: LoginInfo; }
const MainPage: FC<Props> = ({ loginInfo }) => {
    
    return (
        <div className={S['container']}>
            <TalkBox loginInfo={loginInfo} />
        </div>
    );
};

export default MainPage;
