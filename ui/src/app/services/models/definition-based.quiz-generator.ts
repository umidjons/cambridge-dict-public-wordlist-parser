import * as _ from 'lodash';
import { IAnswer, IQuiz, IWord } from '../quiz.interface';
import { IQuizGenerator } from './quiz-generator.interface';

export class DefinitionBasedQuizGenerator implements IQuizGenerator {

  question(words: IWord[], answerQty?: number): IQuiz {
    const shuffled = _.shuffle(words);
    const chosen = shuffled[0];

    return {
      question: chosen.definition,
      answers: this.answers(chosen, shuffled.slice(1), answerQty),
      showed: 0
    };
  }

  answers(chosenWord: IWord, words: IWord[], quantity = 4): IAnswer[] {
    const filtered = words
      .filter(word => chosenWord.definition !== word.definition)
      .filter(word => chosenWord.word !== word.word)
      .slice(0, Math.min(quantity, words.length))
      .concat([chosenWord]);

    return _.shuffle(filtered)
      .map(answer => ({
        text: answer.word,
        correct: chosenWord.definition === answer.definition
      }));
  }

}
