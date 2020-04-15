import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  id: number;
  title: string = '';
  body: string = '';
  addAction: boolean;
  cancelAction: boolean;

  constructor(
    private utils: UtilsService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  submitForm(form) {
    if (this.addAction) {
      const jsonTodo = {
        userId: this.id,
        title: form.value.title,
        completed: false
      };
      this.utils.addNewTodo(this.id, jsonTodo);
    }
    this.router.navigate([{ outlets: { primary: ['todos', this.id] } }], {
      relativeTo: this.ar.parent
    });
  }

  ngOnInit(): void {
    console.log('im in new-todo');
    this.ar.params.subscribe(data => {
      this.id = data['id'];
      this.title = this.utils.getNextName(this.id);
    });
  }
}
