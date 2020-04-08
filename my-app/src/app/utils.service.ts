import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, every } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  address: Object;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private _users = new BehaviorSubject<any>([]);
  private _todos = new BehaviorSubject<any>([]);
  private _posts = new BehaviorSubject<any>([]);

  baseUrl = 'https://jsonplaceholder.typicode.com/';
  usersData: { users: any[]; todos: any[]; posts: any[] } = {
    users: [],
    todos: [],
    posts: []
  };
  readonly users = this._users.asObservable();
  readonly todos = this._users.asObservable();
  readonly posts = this._users.asObservable();

  constructor(private http: HttpClient) {
    // this.getAllData(['users', 'todos', 'posts']);
  }

  loadUsers() {
    this.http.get<any[]>(`${this.baseUrl}users`).subscribe(
      data => {
        this.usersData.users = data;
        console.log(this.usersData.users);
        this._users.next(Object.assign({}, this.usersData).users);
      },
      error => console.log('Could not load users.')
    );
  }

  loadTodos() {
    this.http.get<any[]>(`${this.baseUrl}todos`).subscribe(
      data => {
        this.usersData.todos = data;
        console.log(this.usersData.todos);
        this._todos.next(Object.assign({}, this.usersData).todos);
      },
      error => console.log('Could not load users.')
    );
  }

  loadPosts() {
    this.http.get<any[]>(`${this.baseUrl}posts`).subscribe(
      data => {
        this.usersData.posts = data;
        console.log(this.usersData.posts);
        this._posts.next(Object.assign({}, this.usersData).posts);
      },
      error => console.log('Could not load users.')
    );
  }

  loadAll() {
    this.loadUsers();
    this.loadTodos();
    this.loadPosts();
  }

  getTasks(id: number) {
    let allCompleted: boolean;
    const userTasks = this._todos.pipe(
      map(array => array.filter(todo => todo.userId == id))
    );
    if (
      userTasks.pipe(
        map(array => array.every(task => task.completed == true))
      )[0]
    ) {
      allCompleted = true;
    } else {
      allCompleted = false;
    }
    return { userTasks: userTasks, allCompleted: allCompleted };
  }
}
