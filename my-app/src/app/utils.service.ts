import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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
  dataStore: { users: any[]; todos: any[]; posts: any[] } = {
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
        this.dataStore.users = data.slice(0, 5);
        console.log(this.dataStore.users);
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => console.log('Could not load users.')
    );
  }
  removeUser(userId: number) {
    this.http.delete(`${this.baseUrl}users/${userId}`).subscribe(
      response => {
        console.log('utils deleting');
        this.dataStore.users.forEach((user, index) => {
          if (user.id === userId) {
            this.dataStore.users.splice(index, 1);
          }
        });

        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => console.log('Could not delete todo.')
    );
  }
  updateUser(userId: number, userData) {
    this.http
      .put<User>(`${this.baseUrl}users/${userId}`, JSON.stringify(userData))
      .subscribe(
        response => {
          console.log('utils updating');

          this.dataStore.users.forEach((user, index) => {
            if (user.id === response.id) {
              this.dataStore.users[index] = userData;
              console.log(this.dataStore.users);
            }
          });

          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => console.log('Could not update user.')
      );
  }
  completeTask(taskId, taskData) {
    this.http
      .patch<any>(`${this.baseUrl}todos/${taskId}`, JSON.stringify(taskData))
      .subscribe(
        response => {
          console.log('utils completing task' + taskId);
          console.log(response.id);

          this.dataStore.todos.forEach((task, index) => {
            if (task.id === response.id) {
              this.dataStore.todos[index].completed = true;
              console.log(this.dataStore.todos);
            }
          });
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not update todo.')
      );
  }

  loadTodos() {
    this.http.get<any[]>(`${this.baseUrl}todos`).subscribe(
      data => {
        this.dataStore.todos = data.slice(0, 100);
        console.log(this.dataStore.todos);
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load users.')
    );
  }

  loadPosts() {
    this.http.get<any[]>(`${this.baseUrl}posts`).subscribe(
      data => {
        this.dataStore.posts = data;
        console.log(this.dataStore.posts);
        this._posts.next(Object.assign({}, this.dataStore).posts);
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
    const userTasks = this._todos.pipe(
      map(array => array.filter(todo => todo.userId == id).slice(0, 5))
    );
    return userTasks;
  }
}
