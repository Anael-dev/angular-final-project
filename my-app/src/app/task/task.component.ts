import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() taskData: any;

  constructor(private utils: UtilsService) {}

  completeTask() {
    let data = {
      completed: true
    };
    this.utils.completeTask(this.taskData.id, data);
  }
  ngOnInit(): void {}
}
