interface LoginInfo {
	id: string;
	name: string;
	type: 'teacher' | 'student' | 'parents';
	location: string;
}

export type { LoginInfo };
