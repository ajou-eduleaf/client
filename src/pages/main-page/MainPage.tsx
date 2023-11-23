import {useEffect, useState} from "react";

import {fetchData} from "../../utils/api";

import S from "./MainPage.module.css";
import {MAIN_PAGE_DUMMY} from "./modules/config/dummy";
import ProgressBar from "./modules/progress-bar/ProgressBar";
import TalkBox from "./modules/talk-box/TalkBox";
import TodaysProblem from "./modules/todays-problem/TodaysProblem";
import TodaysState from "./modules/todays-state/TodaysState";

import type {MainPageModel} from "./modules/config/type";
import type {LoginInfo} from "../../config/type";
import type {FC} from "react";

interface Props { loginInfo: LoginInfo; }
const MainPage: FC<Props> = ({ loginInfo }) => {
    const [model, setModel] = useState<MainPageModel>({
        '_': {
            name: '',
            bojId: '',
            problems: [0],
            solved: [0],
            unsolved: [0],
            isFire: false,
            isAttendance: true,
            groupName: '',
        }
    });
    
    useEffect(() => {
        setModel(MAIN_PAGE_DUMMY);
    
        void (async () => {
            try {
                const response = await fetchData<MainPageModel>('/test?studentID=sangjuntest', 'GET');
                console.log(response);
            } catch {
                alert('요청에 실패하였습니다.');
            }
        })();
    }, []);
    
    return (
        <div className={S['container']}>
            <TalkBox loginInfo={loginInfo} />
            <TodaysProblem loginInfo={loginInfo}
                problems={model[Object.keys(model)[0]].problems}
            />
            <TodaysState loginInfo={loginInfo}
                states={model}
            />
            <ProgressBar loginInfo={loginInfo}
                solved={model[Object.keys(model)[0]].solved}
                unsolved={model[Object.keys(model)[0]].unsolved}
            />
        </div>
    );
};

export default MainPage;
