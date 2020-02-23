import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { IAnswer, IQuiz, IWord } from './quiz.interface';
import { QuizGeneratorType } from './models/quiz-generator.enum';
import { DefinitionBasedQuizGenerator } from './models/definition-based.quiz-generator';
import { WordBasedQuizGenerator } from './models/word-based.quiz-generator';
import { IQuizGenerator } from './models/quiz-generator.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  words: IWord[];
  dictUrl: string;

  constructor(private http: HttpClient) { }

  async load(url: string) {
    this.dictUrl = url;
    this.words = await this.http.post<IWord[]>(`${env.apiUrl}/word-list`, {url}).toPromise();
  }

  generate(quantity: number = 50, type: QuizGeneratorType = QuizGeneratorType.byDefinition): IQuiz[] {
    const result = [];
    const qty = Math.min(quantity, this.words.length);
    let generator: IQuizGenerator = this.getGenerator(type);

    for (let i = 0; i < qty; i++) {
      result.push(generator.question(this.words, 4));
    }

    return result;
  }

  getGenerator(type: QuizGeneratorType = QuizGeneratorType.byDefinition): IQuizGenerator {
    switch (type) {
      case QuizGeneratorType.byDefinition:
        return new DefinitionBasedQuizGenerator();

      case QuizGeneratorType.byWord:
        return new WordBasedQuizGenerator();
    }

    return null;
  }

  check(test: IQuiz, chosen: IAnswer): void {
    test.isCorrect = chosen.correct;
  }
}
