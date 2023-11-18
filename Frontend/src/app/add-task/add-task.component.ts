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
  angForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private tasksService: TasksService
    ) { 
    
      this.angForm = this.fb.group({
        content: ['', Validators.required]
      });
  }

  ngOnInit(): void {

  }

  postdata(forms:any){
      this.tasksService.addTask(
      this.angForm.value.content
    )
    .pipe(first()).subscribe(data =>{
        this.route.navigate(['list-tasks']);
    },
    error => { 

    });
    //console.log(this.angForm.value)
  }
}
