import { IAnswer, IQuiz, IWord } from '../quiz.interface';

export interface IQuizGenerator {

  question(words: IWord[], answerQty?: number): IQuiz;

  answers(chosenWord: IWord, words: IWord[], quantity): IAnswer[];

}
