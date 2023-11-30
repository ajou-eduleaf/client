
import {fetchData} from "../../../../utils/api";

import S from './TodaysProblem.module.css';

import type {LoginInfo} from "../../../../config/type";
import type {FC} from "react";

interface Props {
	loginInfo: LoginInfo;
    problems: number[];
    selectedLessonId: number;
}

const TodaysProblem: FC<Props> = ({ loginInfo, problems, selectedLessonId }) => {
    if (loginInfo.type === 'parents') return <></>;
    
    const handleClickRefresh = () => {
        // TODO
    };
    
    const handleAddProbs = () => {
        const probNumToAdd = Number(prompt("추가할 문제 번호를 입력해주세요."));
        if (isNaN(probNumToAdd)) {
            alert("유효하지 않은 번호입니다");
            return;
        }
        
        void (async () => {
            await fetchData(`/lessons/${selectedLessonId}/register/problem/${probNumToAdd}`, 'PUT');
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
                    problems && problems.map((d, i) => {
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
