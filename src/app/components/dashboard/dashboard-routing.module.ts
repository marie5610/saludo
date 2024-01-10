import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BunnyComponent } from './bunny/bunny.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: BunnyComponent },
    { path: 'greetings', component: GreetingsComponent },
    { path: 'reports', component: ReportsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
