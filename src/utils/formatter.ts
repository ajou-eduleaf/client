import type {LoginInfo} from "../config/type";

function jobFormatter(s: LoginInfo['type']) {
    if (s === 'teacher') return '선생님';
    if (s === 'student') return '학생';
    if (s === 'parents') return '학부모님';
}

function capitalizeFormatter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


export { jobFormatter, capitalizeFormatter };
