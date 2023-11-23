interface MainPageModel {
	[id: string]: {
		name: string,
		bojId: string,
		problems: number[],
		solved: number[],
		unsolved: number[],
		isFire: boolean,
		isAttendance: boolean,
		groupName: string
	}
}

export type { MainPageModel };
