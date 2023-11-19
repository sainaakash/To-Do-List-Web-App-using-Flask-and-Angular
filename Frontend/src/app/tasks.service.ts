import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl:string = "http://127.0.0.1:5000/"

  constructor(
    private httpClient:HttpClient
  ) { }

  public addTask(content:any){
    return this.httpClient.post<Tasks>(this.baseUrl+'tasks',{content})
        .pipe(map((Tasks:any) => {
          return Tasks;
    }));
  } 

  public listTasks(){ 
    return this.httpClient.get<Tasks[]>(this.baseUrl+'tasks')
  }

  deleteTasks(id: any){
    return this.httpClient.delete<Tasks[]>(this.baseUrl+'task/'+id)
  }

  getTaskById(id: any) {
    return this.httpClient.get<Tasks[]>(this.baseUrl+'task/'+id)
  }

  updateTask(id: any, tasks: Tasks) {
    return this.httpClient.put<Tasks[]>(this.baseUrl+'task/'+id, tasks);
  }
}
