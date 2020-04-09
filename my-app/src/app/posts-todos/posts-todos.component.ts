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
      sessionStorage['id'] = this.id;
      console.log('from post-todos');
      console.log(sessionStorage['id']);

      this.router.navigate(
        [{ outlets: { primary: ['todos', this.id], posts: 'posts' } }],
        { relativeTo: this.ar }
      );
    });
  }
}
