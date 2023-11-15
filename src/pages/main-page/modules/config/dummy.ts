import type {MainPageModel} from "./type";

const MAIN_PAGE_DUMMY: MainPageModel = {
    '홍길동': {
        bojId: 'hgd123',
        problems: [1,2,3,4,5],
        solved: [1,2,3],
        unsolved: [4,5],
        isFire: false
    },
    '이민서': {
        bojId: 'lms123',
        problems: [1,2,3,4,5],
        solved: [1,2,3],
        unsolved: [4,5],
        isFire: false
    },
};

export { MAIN_PAGE_DUMMY };
