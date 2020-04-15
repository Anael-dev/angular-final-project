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
  readonly todos = this._todos.asObservable();
  readonly posts = this._posts.asObservable();

  constructor(private http: HttpClient) {
    // this.getAllData(['users', 'todos', 'posts']);
  }

  loadUsers() {
    this.http.get<any[]>(`${this.baseUrl}users`).subscribe(
      data => {
        this.dataStore.users = data;
        console.log(this.dataStore.users);
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => console.log(`Could not load users.${error}`)
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
      error => console.log(`Could not delete user.${error.message}`)
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
        error => console.log(`Could not update user.${error.message}`)
      );
  }
  addNewUser(userData) {
    console.log('hello');
    this.http
      .post<any>(`${this.baseUrl}users`, JSON.stringify(userData))
      .subscribe(
        response => {
          console.log('adding new user:');
          console.log(response);
          // const data = { ...userData, id: response.id };
          const data = {
            ...userData,
            id: this.dataStore.users.length + 1
          };

          this.dataStore.users.push(data);
          console.log(this.dataStore.users[this.dataStore.users.length - 1]);
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        error => console.log(`Could not load new todo ${error.message}`)
      );
  }
  getNextName(currUserId) {
    let nextUser;
    this.dataStore.users.forEach((x, index) => {
      if (x.id == currUserId) {
        if (this.dataStore.users[index + 1]) {
          nextUser = this.dataStore.users[index + 1].name;
          console.log(nextUser);
        } else {
          nextUser = this.dataStore.users[currUserId - 1].name;
        }
      }
    });

    return nextUser;
  }

  sum(num1, num2) {
    return Number(num1) + Number(num2);
  }

  completeTask(taskId, taskData) {
    this.http
      .patch<any>(`${this.baseUrl}todos/${taskId}`, JSON.stringify(taskData))
      .subscribe(
        response => {
          console.log('utils completing task' + taskId);
          // console.log(response.id);

          this.dataStore.todos.forEach((task, index) => {
            if (task.id === taskId) {
              //response.id
              this.dataStore.todos[index].completed = true;
              console.log(this.dataStore.todos);
            }
          });
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log(`Could not update todo.${error.message}`)
      );
  }
  addNewTodo(userId, todoData) {
    this.http
      .post<any>(`${this.baseUrl}todos`, JSON.stringify(todoData))
      .subscribe(
        response => {
          console.log('adding task of user:' + userId);
          console.log(response);
          const shapedData = {
            ...todoData,
            id: this.dataStore.todos.length + 1
          }; //id:resonse.id
          this.dataStore.todos.push(shapedData);
          console.log(this.dataStore.todos[this.dataStore.todos.length - 1]);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log(`Could not load new tod${error.message}`)
      );
  }

  addNewPost(userId, postData) {
    this.http
      .post<any>(`${this.baseUrl}posts`, JSON.stringify(postData))
      .subscribe(
        response => {
          console.log('adding post of user:' + userId);
          console.log(response);
          this.dataStore.posts.push(postData);
          console.log(this.dataStore.posts[this.dataStore.posts.length - 1]);
          this._posts.next(Object.assign({}, this.dataStore).posts);
        },
        error => console.log(`Could not load new tod${error.message}`)
      );
  }
  loadTodos() {
    this.http.get<any[]>(`${this.baseUrl}todos`).subscribe(
      data => {
        // data.forEach(x => {
        //   if (x.userId <= 5) {
        //     this.dataStore.todos.push(x);
        //   }
        // });
        this.dataStore.todos = data;
        console.log(this.dataStore.todos);
        console.log('filtered todos');
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log(`Could not load todos. ${error}`)
    );
  }

  loadPosts() {
    this.http.get<any[]>(`${this.baseUrl}posts`).subscribe(
      data => {
        this.dataStore.posts = data;
        console.log(this.dataStore.posts);
        this._posts.next(Object.assign({}, this.dataStore).posts);
      },
      error => console.log(`Could not load posts.${error.message}`)
    );
  }

  loadAll() {
    this.loadUsers();
    this.loadTodos();
    this.loadPosts();
  }

  getPosts(id: number) {
    const userPosts = this._posts.pipe(
      map(array => array.filter(post => post.userId == id))
    );
    // .slice(6)

    return userPosts;
  }

  getTasks(id: number) {
    const userTasks = this._todos.pipe(
      map(array => array.filter(todo => todo.userId == id))
    );
    // .slice(15)
    return userTasks;
  }
}
