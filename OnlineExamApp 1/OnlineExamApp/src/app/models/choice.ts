
export class choice {
    choiceId: number;
    option: string;
    code:string;
    isCorrect: boolean;
    questionId: number;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.choiceId = data.choiceId;
        this.option = data.option;
        this.isCorrect = data.isCorrect;
        this.questionId = data.questionId;
    }
}