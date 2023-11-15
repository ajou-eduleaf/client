import {useEffect, useState} from "react";

import {nameFormatter} from "../../../../utils/formatter";

import S from './TalkBox.module.css';

import type {LoginInfo} from "../../../../config/type";
import type {FC} from "react";


interface props {
	loginInfo: LoginInfo;
}

interface NameRequire {
    name: string;
}

const ParentsToStudent: FC<NameRequire> = ({ name }) => {
    return (
        <div className={S['container']}>
            <img src={`images/parents.png`} />
            <div className={S['wrapper']}>
                <p className={'bold mb-1'}>{`우리 ${nameFormatter(name)}🥰`}</p>
                <span>우리.{nameFormatter(name)}.멋있다~! 코딩왕이.되는.그날까지~! 엄마가.항상.응원해~~~❤❤❤❤❤</span>
            </div>
        </div>
    );
};

const TeacherToStudent: FC<NameRequire> = ({ name }) => {
    return (
        <div className={S['container']}>
            <img src={`images/teacher.png`} />
            <div className={S['wrapper']}>
                <p className={'bold mb-1'}>{`${name} 학생🥰`}</p>
                <span>{nameFormatter(name)} 학생 잘하고 있어요. 오늘도 화이팅!</span>
            </div>
        </div>
    );
};

const TeacherToParents: FC<NameRequire> = ({ name }) => {
    return (
        <div className={S['container']}>
            <img src={`images/teacher.png`} />
            <div className={S['wrapper']}>
                <p className={'bold mb-1'}>{`${name} 학부모님🙇`}</p>
                <span>자제분 정말 잘하고 있어요! 오늘도 좋은 하루 되세요!</span>
            </div>
        </div>
    );
};


const TalkBox: FC<props> = ({ loginInfo }) => {
    const { name, type } = loginInfo;
    const [retEl, setRetEl] = useState(<></>);
    
    useEffect(() => {
        if (type === 'student') {
            setRetEl(
                <>
                    <ParentsToStudent name={name} />
                    <TeacherToStudent name={name} />
                </>
            );
        }
    
        if (type === 'parents') {
            setRetEl(
                <TeacherToParents name={name} />
            );
        }
        
        if (type === 'teacher') setRetEl(<></>);
    }, [loginInfo]);
    
	
    return (
        <div>{retEl}</div>
    );
};

export default TalkBox;
