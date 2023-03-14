export class ChapterData {
    public cardId: string;
    public chapters: ChapterPosition[];

    constructor(cartId: string, chapters: ChapterPosition[]) {
        this.cardId = cartId;
        this.chapters = chapters;
    }
}

export class ChapterPosition {
    public chapterId: string;
    public currentVideoPosition: number;
    public watched: boolean;

    constructor(chapterId: string, currentVideoPosition: number, watched: boolean) {
        this.chapterId = chapterId;
        this.currentVideoPosition = currentVideoPosition;
        this.watched = watched;
    }
}