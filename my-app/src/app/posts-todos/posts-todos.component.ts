import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-todos',
  templateUrl: './posts-todos.component.html',
  styleUrls: ['./posts-todos.component.css']
})
export class PostsTodosComponent implements OnInit {
  id: number;
  constructor(private ar: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.ar.params.subscribe(data => {
      this.id = data.id;
      console.log('from post-todos');

      this.router.navigate(
        [
          {
            outlets: {
              primary: ['todos', this.id],
              posts: ['posts', this.id]
            }
          }
        ],
        { relativeTo: this.ar }
      );
    });
  }
}
