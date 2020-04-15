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
  todos: Observable<any[]>;

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  addData() {
    console.log('adding data');

    this.router.navigate([{ outlets: { primary: ['new-todo', this.id] } }], {
      relativeTo: this.ar.parent
    });
  }
  ngOnInit(): void {
    // this.id = sessionStorage['id'];
    // console.log('from todos');
    // console.log(this.id);
    this.ar.params.subscribe(data => {
      this.id = data['id'];
      console.log(this.id);
      this.todos = this.utils.getTasks(this.id);
    });
  }
}
