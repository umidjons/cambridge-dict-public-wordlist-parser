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

  generate(quantity: number = 5) {
    const result = [];

    for (let i = 0; i < quantity; i++) {

      const words = _.shuffle(this.words);
      const chosen = words[0];

      result.push({
        question: chosen.word,
        answers: _.shuffle(words.slice(0, 4)
          .map(answer => {
            return {
              text: answer.definition,
              correct: chosen.word === answer.word
            };
          })),
        showed: 0
      });

    }

    return result;
  }

  check(test: IQuiz, chosen: IAnswer): void {
    test.isCorrect = chosen.correct;
  }
}
