import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  id: number;
  dataType: string;
  todos: Observable<any[]>;
  posts: Observable<any[]>;

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  addData() {
    console.log('adding data');
    if (this.dataType === 'Todos') {
      this.router.navigate(
        [{ outlets: { primary: ['new-todo', 'Todos', this.id] } }],
        {
          relativeTo: this.ar.parent
        }
      );
    }
    if (this.dataType === 'Posts') {
      this.router.navigate(
        [{ outlets: { posts: ['new-todo', 'Posts', this.id] } }],
        {
          relativeTo: this.ar.parent
        }
      );
    }
  }
  ngOnInit(): void {
    // this.id = sessionStorage['id'];
    // console.log('from todos');
    // console.log(this.id);
    this.ar.params.subscribe(data => {
      this.id = data['id'];
      console.log(this.id);
      this.dataType = data['type'];
      console.log(this.dataType);
      if (this.dataType === 'Todos') {
        this.todos = this.utils.getTasks(this.id);
      }
      if (this.dataType === 'Posts') {
        this.posts = this.utils.getPosts(this.id);
        console.log(this.posts);
      }
    });
  }
}
