import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tasksService: TasksService
  ) { 
    this.angForm = this.fb.group({
      content: ['', Validators.required],
      dueDate: ['', Validators.required],
      completed: [false, Validators.required]  
    });
  }

  postdata() {
    this.tasksService.addTask(this.angForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-tasks']);
        },
        error => {
          console.error('Error:', error);
          // You can add more meaningful error handling here
        }
      );
  }
}
