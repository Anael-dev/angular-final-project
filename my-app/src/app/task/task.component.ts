import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() data: any;
  @Input() todos: boolean;

  constructor(private utils: UtilsService) {}

  completeTask() {
    let data = {
      completed: true
    };
    this.utils.completeTask(this.data.id, data);
  }
  ngOnInit(): void {}
}
