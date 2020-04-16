import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
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
      const jsonPost = new Post(this.id, form.value.title, form.value.body);
      this.utils.addNewPost(this.id, jsonPost);
    }

    this.router.navigate([{ outlets: { posts: ['posts', this.id] } }], {
      relativeTo: this.ar.parent
    });
  }

  ngOnInit(): void {
    this.ar.params.subscribe(data => (this.id = data['id']));
  }
}
