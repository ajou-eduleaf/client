
import { useEffect, useState} from "react";

import {fetchData} from "../../../../utils/api";

import S from './TodaysProblem.module.css';

import type {LoginInfo} from "../../../../config/type";
import type {FC,Dispatch, SetStateAction} from "react";

interface Props {
	loginInfo: LoginInfo;
    problems: number[];
    selectedLessonId: number;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const TodaysProblem: FC<Props> = ({ loginInfo, problems, selectedLessonId, setRefresh}) => {
    if (loginInfo.type === 'parents') return <></>;
    
    const [zzProblems, setZzProblems] = useState<number[]>([]);
    
    useEffect(() => {
        setZzProblems(problems);
    }, [problems]);
    
    const handleClickRefresh = () => {
        setRefresh(true);
    };
    
    const handleAddProbs = () => {
        const probNumToAdd = Number(prompt("추가할 문제 번호를 입력해주세요."));
        if (isNaN(probNumToAdd)) {
            alert("유효하지 않은 번호입니다");
            return;
        }
        
        void (async () => {
            try {
                setZzProblems((prev) => {
                    const _prev = [...prev];
                    _prev.push(probNumToAdd);
                    return _prev;
                });
                await fetchData(`/lessons/${selectedLessonId}/register/problem/${probNumToAdd}`, 'PUT');
            } catch (e) {
                console.error(e);
            }
        })();
    };
	
	
    return (
        <div className={S['container']}>
            <div className={S['title-area']}>
                <h2>Today&apos;s Problem</h2>
                <button onClick={handleClickRefresh}>🔄 Refresh</button>
            </div>
            <div className={S['prob-area']}>
                {
                    zzProblems && zzProblems.map((d, i) => {
                        return (
                            <a href={`https://www.acmicpc.net/problem/${d}`} key={i} target={'_blank'} rel="noreferrer">
                                <div className={S['probs']} >
                                    {d}
                                </div>
                            </a>
                        );
                    })
                }
                {
                    loginInfo.type === 'teacher' &&
                        <div className={S['probs-add']}
                            onClick={handleAddProbs}
                        >
                            +
                        </div>
                }
            </div>
        </div>
    );
};

export default TodaysProblem;
