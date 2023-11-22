import {useEffect, useState} from "react";

import {capitalizeFormatter} from "../../utils/formatter";

import {RANK_PAGE_DUMMY} from "./config/dummy";
import {medalMaker} from "./config/util";
import S from './RankPage.module.css';

import type {RankPageModel, RankType} from "./config/type";
import type {Dispatch, FC, SetStateAction} from "react";


interface SelectRankProps {
    rankType: RankType
    selectedRank: RankType
    setSelectedRank: Dispatch<SetStateAction<RankType>>
}
const SelectRank: FC<SelectRankProps> = ({ rankType, selectedRank, setSelectedRank }) => {
    const handleSelectRankType = (type: RankType) => {
        setSelectedRank(type);
    };
    
    return (
        <span onClick={() => handleSelectRankType(rankType)}
            className={[selectedRank === rankType ? 'bold' : '', S['selected-rank']].join(' ')}
        >
            {capitalizeFormatter(rankType)}
        </span>
    );
};

const RankPage = () => {
    const [selectedRank, setSelectedRank] = useState<RankType>('today');
    const [rankPageModel, setRankPageModel] = useState<RankPageModel>([{bojId: '', solved: 0}]);
    
    useEffect(() => {
        setRankPageModel(RANK_PAGE_DUMMY);
    }, []);
    
    return (
        <div className={S['container']}>
            <div className={'mb-8'}>
                <div>
                    {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                        ['today', 'month', 'total'].map((d: RankType) => {
                            return <SelectRank key={d} rankType={d} selectedRank={selectedRank} setSelectedRank={setSelectedRank} />;
                        })
                    }
                </div>
                <h2 className={S['title']}>Ranking</h2>
            </div>
    
            <table>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>푼 문제 수</th>
                </tr>
                {rankPageModel.map((d, i) => (
                    <tr key={i}>
                        <td>{`${i+1}${medalMaker(i+1)}`}</td>
                        <td>{d.bojId}</td>
                        <td>128</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default RankPage;
