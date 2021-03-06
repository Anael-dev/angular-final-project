import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  id: number;
  posts: Observable<Post[]>;

  constructor(
    private utils: UtilsService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  addData() {
    console.log('adding data');

    this.router.navigate([{ outlets: { posts: ['new-post', this.id] } }], {
      relativeTo: this.ar.parent,
    });
  }
  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((data) => {
      this.id = data['id'];
      this.posts = this.utils.getPosts(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
