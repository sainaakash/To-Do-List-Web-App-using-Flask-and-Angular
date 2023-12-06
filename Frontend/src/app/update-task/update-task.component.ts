import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  angForm : FormGroup;
  error: any;
  subscription: any;
  id: any;
  task: any;
  tasks: any;
  success: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private tasksService: TasksService,
    private activeRoute: ActivatedRoute
  ) {

    this.angForm = this.fb.group({
      id: [''],
      dueDate: [''],
      content: ['', Validators.required],
    });

    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
  }

  ngOnInit(): void {
    this.getSingleTask(this.id);
  }

  getSingleTask(id: any): void {
    this.tasksService.getTaskById(id)
      .subscribe((res: any) => {
        this.task = res;
        this.angForm.patchValue(this.task);
        console.log(res);
      },
      (err: any) => {
        this.error = err;
      });
  }  

  editData(f: any) {
    console.log(f.value);
    this.tasksService.updateTask(this.id, f.value)
      .subscribe((res: any) => {
        this.tasks = res;
        this.success = "Updated successfully";
        this.route.navigate(['/list-tasks']);
      },
      (err: any) => {
        this.error = err;
      })
  }
}
