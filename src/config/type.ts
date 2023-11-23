interface LoginInfo {
	id: string;
	name: string;
	type: 'teacher' | 'student' | 'parents';
	location: string;
	groupName: string;
}

export type { LoginInfo };
