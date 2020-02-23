export interface IWord {
  word: string;
  definition: string;
}

export interface IAnswer {
  text: string;
  correct?: boolean;
}

export interface IQuiz {
  question: string;
  answers: IAnswer[];
  showed?: number;
  isCorrect?: boolean;
}
