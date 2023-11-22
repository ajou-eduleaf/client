import type {LoginInfo} from "../../../../config/type";
import type {FC} from "react";


interface Props {
	loginInfo: LoginInfo
	solved: number[],
	unsolved: number[]
}
const ProgressBar: FC<Props> = ({ loginInfo, solved, unsolved }) => {
    if (loginInfo.type === 'teacher') return <></>;
	
    const sl = solved.length;
    const ul = unsolved.length;
	
    return (
        <div>
            <h2 className={'bold mb-2'} style={{ fontSize: '24px' }}>Progress</h2>
            <span className={'mb-2 block'} style={{ fontSize: '18px' }}>{sl}/{sl+ul} Problems | {(sl / (sl+ul) * 100).toFixed(0)}%</span>
            <div style={{ width: '100%', backgroundColor: "#D9D9D9", height: '48px', borderRadius: '8px' }} />
            <div style={{width: `${(sl / (sl+ul) * 100).toFixed(0)}%`, backgroundColor: "#D1EDC7", height: '48px', position: 'relative', bottom: '48px', borderRadius: '8px'}} />
        </div>
    );
};

export default ProgressBar;
