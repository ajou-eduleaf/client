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
    const [lessonId, setLessonId] = useState<string>('');
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
        if (!loginInfo.id) return;
        void (async () => {
            try {
                const response = await fetchData<MainPageModel>(`/lessons/${lessonId}/info?type=${loginInfo.type}&id=${loginInfo.id}`, 'GET');
                setModel(response);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [loginInfo]);
    
    useEffect(() => {
        if (!loginInfo.id || !lessonId) return;
        void (async () => {
            try {
                const response = await fetchData<MainPageModel>(`/lessons/1/info?type=${loginInfo.type}&id=${loginInfo.id}`, 'GET');
                // const response = await fetchData<MainPageModel>(`/api/lessons/1/info?type=teacher&id=ajs`, 'GET');
                setModel(response);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [lessonId]);
    
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
