import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() data: Todo;

  constructor(private utils: UtilsService) {}

  completeTask() {
    let completedData = {
      completed: true
    };
    this.utils.completeTask(this.data.id, completedData);
  }

  ngOnInit(): void {}
}
