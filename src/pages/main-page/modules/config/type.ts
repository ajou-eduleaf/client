interface MainPageModel {
	studentInfo: {
		[id: string]: {
			name: string,
			bojId: string,
			todayProblems: number[],
			solvedProblems: number[],
			unsolvedProblems: number[],
			isFire: boolean,
			isAttendance: boolean,
			groupName: string
		}
	}
}

interface Lesson {
	lessonId: number;
	content: string;
	date: string;
}

interface LessonListModel {
	allLessons: Array<Lesson>;
	groupName: string;
}

export type { MainPageModel, Lesson, LessonListModel };
