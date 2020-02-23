import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private quizService: QuizService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      url: ''
    });
  }

  async startQuiz(params) {
    await this.quizService.load(params.url);
    this.router.navigate(['/test-yourself']);
  }

}
