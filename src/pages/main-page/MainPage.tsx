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
    const [model, setModel] = useState<MainPageModel>({studentInfo :{
        '_': {
            name: '',
            bojId: '',
            todayProblems: [0],
            solvedProblems: [0],
            unsolvedProblems: [0],
            isFire: false,
            isAttendance: true,
            groupName: '',
        }
    }});
    const [refresh, setRefresh] = useState<boolean>(false);
    
    useEffect(() => {
        if (!refresh || !loginInfo.id || !selectedLessonId) return;
        void (async () => {
            try {
                const response = await fetchData<MainPageModel>(`/lessons/${selectedLessonId}/info?type=${loginInfo.type}&id=${loginInfo.id}`, 'GET');
                setModel(response);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [refresh]);
    
    useEffect(() => {
        if (!loginInfo.id) return;
        void (async () => {
            try {
                const lessonListResponse = await fetchData<LessonListModel>(`/groups/${loginInfo.groupName}/lessons`, 'GET');
                setLessonList(lessonListResponse);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [loginInfo]);
    
    useEffect(() => {
        setSelectedLessonId(lessonList?.allLessons[0].lessonId ?? 0);
    }, [lessonList]);
    
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
                // @ts-ignore
                problems={model.studentInfo[Object.keys(model[Object.keys(model)[0]])[0]].todayProblems}
                selectedLessonId={selectedLessonId}
                setRefresh={setRefresh}
            />
            <TodaysState loginInfo={loginInfo}
                states={model.studentInfo}
                selectedLessonId={selectedLessonId}
            />
            <ProgressBar loginInfo={loginInfo}
                // @ts-ignore
                solved={model.studentInfo[Object.keys(model[Object.keys(model)[0]])[0]].solvedProblems}
                // @ts-ignore
                unsolved={model.studentInfo[Object.keys(model[Object.keys(model)[0]])[0]].unsolvedProblems}
            />
        </div>
    );
};

export default MainPage;
