import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  id: number;
  todos: Observable<any[]>;

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.id = sessionStorage['id'];
    console.log('from todos');
    console.log(this.id);
    this.todos = this.utils.getTasks(this.id).userTasks;

    console.log(this.todos);
  }
}
