import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
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
        body: form.value.body
      };
      this.utils.addNewPost(this.id, jsonTodo);
    }

    this.router.navigate([{ outlets: { posts: ['posts', this.id] } }], {
      relativeTo: this.ar.parent
    });
  }

  ngOnInit(): void {
    console.log('im in new-todo');
    this.ar.params.subscribe(data => (this.id = data['id']));
  }
}
