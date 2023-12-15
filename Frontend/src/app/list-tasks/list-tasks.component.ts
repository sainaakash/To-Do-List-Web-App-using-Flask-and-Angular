import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { Tasks } from '../tasks.model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {
  
  tasks: any;

  constructor(
    private tasksService: TasksService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.tasksService.listTasks()
    .subscribe((data: any) => {
      this.tasks = data.Tasks;
    })
  }


  deleteTask(taskId: any): void {
    this.tasksService.deleteTasks(taskId)
      .subscribe((data: any) => {
        setTimeout(() => {
          this.tasksService.listTasks()
            .subscribe((data: any) => {
              this.tasks = data.Tasks;
            })
        }, 100);
      });
  }

  markAsComplete(task: any) {
    task.completed = true;

    this.tasksService.markTaskAsComplete(task.id)
      .subscribe(
        response => {
          console.log('Task marked as complete successfully:', response);
          
        },
        error => {
          console.error('Error marking task as complete:', error);
          
        }
      );
  }

}
