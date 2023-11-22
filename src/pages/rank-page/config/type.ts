interface RankPageData {
	bojId: string;
	solved: number;
}

type RankPageModel = RankPageData[];


type RankType = 'today' | 'month' | 'total';


export type { RankPageData, RankPageModel, RankType };
