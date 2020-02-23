import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { IAnswer, IQuiz, IWord } from './quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  words: IWord[];

  constructor(private http: HttpClient) { }

  async load(url: string) {
    this.words = await this.http.post<IWord[]>(`${env.apiUrl}/word-list`, {url}).toPromise();
  }

  generate(quantity: number = 50): IQuiz[] {
    const result = [];

    const qty = Math.min(quantity, this.words.length);

    for (let i = 0; i < qty; i++) {
      result.push(this.generateQuiz())
    }

    return result;
  }

  generateQuiz(answerQty?: number): IQuiz {
    const words = _.shuffle(this.words);
    const chosen = words[0];

    return {
      question: chosen.word,
      answers: this.generateAnswers(chosen, words, answerQty),
      showed: 0
    };
  }

  generateAnswers(chosenWord: IWord, words: IWord[], quantity = 4): IAnswer[] {
    const filtered = words
      .filter(word => chosenWord.word !== word.word)
      .slice(0, Math.min(quantity, words.length))
      .concat([chosenWord]);

    return _.shuffle(filtered)
      .map(answer => ({
        text: answer.definition,
        correct: chosenWord.word === answer.word
      }));
  }

  check(test: IQuiz, chosen: IAnswer): void {
    test.isCorrect = chosen.correct;
  }
}
