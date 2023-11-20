import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  { path: 'add-task', component: AddTaskComponent},
  { path: 'list-tasks', component: ListTasksComponent},
  { path: 'update-task/:id', component: UpdateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
