import { choice } from './choice';
import { programCode } from './programCode';

export class examQuestion {
        questionId: number;
        question: string;
        questionType:number;
        complexity:string;
        choices: choice[];
        answered: boolean;
        code:string;
        codes:programCode[]

    constructor(data: any) {
        data = data || {};
        this.questionId = data.questionId;
        this.question = data.question;
        this.questionType=data.questionType;
        this.complexity=data.complexity;
        this.code="";
        this.choices = [];
        data.choices.forEach(o => {
            this.choices.push(new choice(o));
        });
    }
}
