import {useEffect, useState} from "react";

import {fetchData} from "../../utils/api";

import S from "./MainPage.module.css";
import ProgressBar from "./modules/progress-bar/ProgressBar";
import TalkBox from "./modules/talk-box/TalkBox";
import TodaysProblem from "./modules/todays-problem/TodaysProblem";
import TodaysState from "./modules/todays-state/TodaysState";

import type {LessonListModel, MainPageModel} from "./modules/config/type";
import type {LoginInfo} from "../../config/type";
import type {FC} from "react";

interface Props { loginInfo: LoginInfo; }
const MainPage: FC<Props> = ({ loginInfo }) => {
    const [lessonList, setLessonList] = useState<LessonListModel>();
    const [selectedLessonId, setSelectedLessonId] = useState<number>(0);
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
        console.log(loginInfo.id, selectedLessonId);
        if (!loginInfo.id) return;
        void (async () => {
            try {
                const lessonListResponse = await fetchData<LessonListModel>(`/groups/${loginInfo.groupName}/lessons`, 'GET');
                setLessonList(lessonListResponse);
                setSelectedLessonId(lessonList?.allLessons[0].lessonId ?? 0);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [loginInfo]);
    
    useEffect(() => {
        if (!loginInfo.id || !selectedLessonId) return;
        void (async () => {
            try {
                const response = await fetchData<MainPageModel>(`/lessons/${selectedLessonId}/info?type=${loginInfo.type}&id=${loginInfo.id}`, 'GET');
                setModel(response);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [selectedLessonId]);
    
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
