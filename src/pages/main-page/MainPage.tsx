
import {useEffect, useState} from "react";

import S from "./MainPage.module.css";
import {MAIN_PAGE_DUMMY} from "./modules/config/dummy";
import TalkBox from "./modules/talk-box/TalkBox";
import TodaysProblem from "./modules/todays-problem/TodaysProblem";

import type {MainPageModel} from "./modules/config/type";
import type {LoginInfo} from "../../config/type";
import type {FC} from "react";

interface Props { loginInfo: LoginInfo; }
const MainPage: FC<Props> = ({ loginInfo }) => {
    const [model, setModel] = useState<MainPageModel>({
        '_': {
            bojId: '',
            problems: [0],
            solved: [0],
            unsolved: [0],
            isFire: false,
            isAttendance: true
        }
    });
    
    useEffect(() => {
        setModel(MAIN_PAGE_DUMMY);
    }, []);
    
    return (
        <div className={S['container']}>
            <TalkBox loginInfo={loginInfo} />
            <TodaysProblem loginInfo={loginInfo}
                problems={model[Object.keys(model)[0]].problems}
            />
        </div>
    );
};

export default MainPage;
