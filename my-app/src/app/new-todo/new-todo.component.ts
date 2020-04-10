import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  id: number;
  title = 'hi';
  addAction: boolean;

  constructor(private utils: UtilsService, private ar: ActivatedRoute) {}

  submitForm(form) {
    if (form.valid) {
    } else {
    }
  }
  ngOnInit(): void {
    this.ar.params.subscribe(data => {
      this.id = data['id'];
      this.title = this.utils.getNextName(this.id);
    });
  }
}
