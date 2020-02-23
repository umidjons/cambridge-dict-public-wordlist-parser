import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAnswer, IQuiz } from '../services/quiz.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent {

  @Input() num: number;
  @Input() test: IQuiz;
  @Output() onAnswer = new EventEmitter<IAnswer>();

  constructor() { }

}
