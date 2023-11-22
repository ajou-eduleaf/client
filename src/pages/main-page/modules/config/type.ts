interface MainPageModel {
	[name: string]: {
		bojId: string;
		problems: number[],
		solved: number[],
		unsolved: number[],
		isFire: boolean,
		isAttendance: boolean,
	}
}

export type { MainPageModel };
