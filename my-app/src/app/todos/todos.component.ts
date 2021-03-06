import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  sub: Subscription;
  id: number;
  todos: Observable<Todo[]>;

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  addData() {
    console.log('adding data');

    this.router.navigate([{ outlets: { primary: ['new-todo', this.id] } }], {
      relativeTo: this.ar.parent,
    });
  }
  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((data) => {
      this.id = data['id'];
      this.todos = this.utils.getTasks(this.id);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
