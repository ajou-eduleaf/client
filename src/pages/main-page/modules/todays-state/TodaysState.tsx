import {useEffect, useState} from "react";

import {BOJ_HOME} from "../../../../common/config";
import {fetchData} from "../../../../utils/api";

import S from './TodaysState.module.css';

import type {LoginInfo} from "../../../../config/type";
import type {MainPageModel} from "../config/type";
import type {FC, MouseEventHandler} from "react";

interface Props {
    loginInfo: LoginInfo;
    states: MainPageModel['studentInfo'];
    selectedLessonId: number;
}

function distinctFire(s: string, f: boolean) {
    if (f) return `🔥 ${s} 🔥`;
    return s;
}

const AttendanceButton = () => {
    return (
        <button className={S['attendance-btn']}>✅ Attendance</button>
    );
};

interface AbsentButtonProps { onClick: MouseEventHandler<HTMLButtonElement>; }

const AbsentButton: FC<AbsentButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className={S['absent-btn']}>❎ Absent</button>
    );
};

const TodaysState: FC<Props> = ({ loginInfo, states, selectedLessonId }) => {
    const [zzStates, setZzStates] = useState<MainPageModel['studentInfo']>(states);
    
    useEffect(/**/() => {
        setZzStates(states);
    }, [states]);
    
    const handleAttendance = (i: number) => {
        if (loginInfo.type !== 'teacher') return;
        
        void (async () => {
            try {
                await fetchData(`/lessons/${selectedLessonId}/attendance/${loginInfo.id}`, 'PATCH');
    
                setZzStates((prev) => {
                    const _prev = { ...prev };
                    // @ts-ignore
                    _prev[Object.keys(prev)[i]].isAttendance = true;
                    return _prev;
                });
            } catch (e) {
                console.error(e);
            }
        })();
    };
    
    return (
        <div className={S['container']}>
            <h2>Today&apos;s state</h2>
            {
                Object.keys(zzStates).map((d, i) => {
                    return (
                        <div key={i} className={'mb-4'}>
                            <div className={S['name-wrapper']}>
                                {/*// @ts-ignore*/}
                                <span>{distinctFire(`${d} | ${zzStates[d].bojId}`, zzStates[d].isFire)}</span>
                                {/*// @ts-ignore*/}
                                {zzStates[d].isAttendance ? <AttendanceButton /> : <AbsentButton onClick={() => handleAttendance(i)} />}
                            </div>
                            <div className={S['gray-box']}>
                                <div className={'mb-4'}>
                                    <p className={'bold mb-1'}>Solved</p>
                                    <div className={S['prob-list']}>
                                        {/*// @ts-ignore*/}
                                        {zzStates[d].solvedProblems.map((d2, i2) => {
                                            return (
                                                <a href={`${BOJ_HOME}${d2}`} key={i2} target={'_blank'} rel="noreferrer">
                                                    <div className={S['probs-solved']}>{d2}</div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                                <p className={'bold mb-1'}>Unsolved</p>
                                <div className={S['prob-list']}>
                                    {/*// @ts-ignore*/}
                                    {zzStates[d].unsolvedProblems.map((d2, i2) => {
                                        return (
                                            <a href={`${BOJ_HOME}${d2}`} key={i2} target={'_blank'} rel="noreferrer">
                                                <div className={S['probs-unsolved']}>{d2}</div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default TodaysState;
