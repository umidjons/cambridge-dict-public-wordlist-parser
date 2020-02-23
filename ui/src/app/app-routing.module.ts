import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TesterComponent } from './tester/tester.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'test-yourself',
    component: TesterComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
