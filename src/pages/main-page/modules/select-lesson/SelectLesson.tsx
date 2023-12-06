import S from './SelectLesson.module.css';

import type {LessonListModel} from "../config/type";
import type {Dispatch, FC, SetStateAction} from "react";

interface Props {
    lessonList: LessonListModel|undefined
    selectedLessonId: number;
    setSelectedLessonId: Dispatch<SetStateAction<number>>
}
const SelectLesson: FC<Props> = ({ lessonList, selectedLessonId, setSelectedLessonId }) => {
    const handleChange = (event: any) => {
        setSelectedLessonId(event.target.value);
    };
    
    return (
        <div className={S['container']}>
            <h1>Select Lesson</h1>
            <select value={selectedLessonId} onChange={handleChange}>
                {
                    lessonList?.allLessons.length && lessonList.allLessons.map((d, i) => {
                        return (
                            <option value={d.lessonId} key={i}>{d.content} | {d.lessonId}</option>
                        );
                    })
                }
            </select>
        </div>
    );
};

export default SelectLesson;
