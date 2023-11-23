import type {MainPageModel} from "./type";

const MAIN_PAGE_DUMMY: MainPageModel = {
    'hgd123456': {
        name: '홍길동',
        bojId: 'hgd123',
        problems: [1,2,3,4,5],
        solved: [1,2,3],
        unsolved: [4,5],
        isFire: false,
        isAttendance: true,
        groupName: '오전B반'
    },
    'lms123456': {
        name: '이민서',
        bojId: 'lms123',
        problems: [1,2,3,4,5],
        solved: [1,2,3],
        unsolved: [4,5],
        isFire: false,
        isAttendance: false,
        groupName: '오후C반'
    },
};

export { MAIN_PAGE_DUMMY };
