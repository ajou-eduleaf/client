interface MainPageModel {
	[name: string]: {
		bojId: string;
		problems: number[],
		solved: number[],
		unsolved: number[],
		isFire: boolean
	}
}

export type { MainPageModel };
