interface LoginInfo {
	id: string;
	name: string;
	type: 'teacher' | 'student' | 'parents';
	academyName: string;
	groupName: string;
}

export type { LoginInfo };
