import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() data: any;

  constructor(private utils: UtilsService, private http: HttpClient) {}

  completeTask() {
    let data = {
      completed: true
    };
    this.utilsA(this.data.id, data);
    // this.utils.completeTask(this.data.id, data);
  }
  utilsA(taskId, taskData) {
    this.http
      .patch<any>(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        JSON.stringify(taskData)
      )
      .subscribe(
        response => {
          console.log('utils completing task' + taskId);
          console.log(response);

          // console.log(response.id);
        },
        error => console.log(`Could not update todo.${error.message}`)
      );
  }
  ngOnInit(): void {}
}
