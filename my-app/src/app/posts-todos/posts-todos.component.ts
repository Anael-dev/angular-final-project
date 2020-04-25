import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-todos',
  templateUrl: './posts-todos.component.html',
  styleUrls: ['./posts-todos.component.css'],
})
export class PostsTodosComponent implements OnInit, OnDestroy {
  sub: Subscription;
  id: number;
  constructor(private ar: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.ar.params.subscribe((data) => {
      this.id = data.id;

      this.router.navigate(
        [
          {
            outlets: {
              primary: ['todos', this.id],
              posts: ['posts', this.id],
            },
          },
        ],
        { relativeTo: this.ar }
      );
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
