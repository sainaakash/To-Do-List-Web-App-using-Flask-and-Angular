import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Subscription } from 'rxjs';

// ... (existing imports)

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {
  angForm: FormGroup;
  error: any;
  id: any;
  task: any;
  success: string | undefined;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute
  ) {
    this.angForm = this.fb.group({
      id: [''],
      dueDate: [''],
      content: ['', Validators.required],
      completed: [false], // Assuming completed is a boolean, change the type accordingly
    });

    this.subscription = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.getSingleTask(this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSingleTask(id: any): void {
    this.tasksService.getTaskById(id)
      .subscribe(
        (res: any) => {
          this.task = res;
          this.angForm.patchValue(this.task);
          console.log(res);
        },
        (err: any) => {
          this.error = err;
        }
      );
  }

  editData(): void {
    if (this.angForm.valid) {
      this.tasksService.updateTask(this.id, this.angForm.value)
        .subscribe(
          (res: any) => {
            this.success = 'Updated successfully';
            this.router.navigate(['/list-tasks']);
          },
          (err: any) => {
            this.error = err;
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
