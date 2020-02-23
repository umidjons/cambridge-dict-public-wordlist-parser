import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { IAnswer, IQuiz } from '../services/quiz.interface';
import { QuizGeneratorType } from '../services/models/quiz-generator.enum';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styles: []
})
export class TesterComponent implements OnInit {

  tests: IQuiz[];
  currentIndex: number;
  currentTest: IQuiz;

  constructor(private quizService: QuizService) { }

  async ngOnInit(): Promise<void> {
    this.tests = [];

    await this.quizService.load('https://dictionary.cambridge.org/us/plus/wordlist/24986999_toefl400_9');
    this.initTests(QuizGeneratorType.byDefinition);
  }

  initTests(type) {
    this.tests = this.quizService.generate(10, type);

    this.currentIndex = 0;
    this.currentTest = this.tests[this.currentIndex];
  }

  next() {
    if (this.currentIndex + 1 < this.tests.length) {
      this.currentIndex++;
      this.currentTest = this.tests[this.currentIndex];
    }
  }

  checkAndAdvance(answer: IAnswer) {
    this.quizService.check(this.currentTest, answer);
    this.next();
  }

  isFinished(): boolean {
    return this.currentIndex + 1 === this.tests.length && this.currentTest.isCorrect != null;
  }

}
