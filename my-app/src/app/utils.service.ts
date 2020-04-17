import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { Todo } from './todo';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private _users = new BehaviorSubject<User[]>([]);
  private _todos = new BehaviorSubject<Todo[]>([]);
  private _posts = new BehaviorSubject<Post[]>([]);

  baseUrl = 'https://jsonplaceholder.typicode.com/';
  dataStore: { users: User[]; todos: Todo[]; posts: Post[] } = {
    users: [],
    todos: [],
    posts: [],
  };
  readonly users = this._users.asObservable();
  readonly todos = this._todos.asObservable();
  readonly posts = this._posts.asObservable();

  constructor(private http: HttpClient) {}

  loadUsers() {
    this.http.get<User[]>(`${this.baseUrl}users`).subscribe(
      (data) => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      (error) => console.log(`Could not load users.${error}`)
    );
  }
  removeUser(userId: number) {
    this.http.delete(`${this.baseUrl}users/${userId}`).subscribe(
      (response) => {
        console.log('utils deleting');
        this.dataStore.users.forEach((user, index) => {
          if (user.id === userId) {
            this.dataStore.users.splice(index, 1);
          }
        });

        this._users.next(Object.assign({}, this.dataStore).users);
      },
      (error) => console.log(`Could not delete user.${error.message}`)
    );
  }
  updateUser(userId: number, userData) {
    this.http
      .put<User>(`${this.baseUrl}users/${userId}`, JSON.stringify(userData))
      .subscribe(
        (response) => {
          console.log('utils updating');

          this.dataStore.users.forEach((user, index) => {
            if (user.id === response.id) {
              this.dataStore.users[index] = userData;
              console.log(this.dataStore.users);
            }
          });

          this._users.next(Object.assign({}, this.dataStore).users);
        },
        (error) => console.log(`Could not update user.${error.message}`)
      );
  }
  addNewUser(userData: User) {
    console.log('hello');
    this.http
      .post<User>(`${this.baseUrl}users`, JSON.stringify(userData))
      .subscribe(
        (response) => {
          console.log('adding new user:');
          console.log(response);
          // const data = { ...userData, id: response.id };
          const data = {
            ...userData,
            id: Number(this.dataStore.users.length + 1),
          };

          this.dataStore.users.push(data);
          this._users.next(Object.assign({}, this.dataStore).users);
        },
        (error) => console.log(`Could not load new todo ${error.message}`)
      );
  }
  getNextName(currUserId: number) {
    let nextUser;
    this.dataStore.users.forEach((x, index) => {
      if (x.id == currUserId) {
        if (this.dataStore.users[index + 1]) {
          nextUser = this.dataStore.users[index + 1].name;
        } else {
          nextUser = this.dataStore.users[currUserId - 1].name;
        }
      }
    });

    return nextUser;
  }

  completeTask(taskId: number, taskData: object) {
    this.http
      .patch<Todo>(`${this.baseUrl}todos/${taskId}`, JSON.stringify(taskData))
      .subscribe(
        (response) => {
          console.log('utils completing task' + '' + taskId);
          // console.log(response.id);

          this.dataStore.todos.forEach((task, index) => {
            if (task.id === taskId) {
              //response.id
              this.dataStore.todos[index].completed = true;
            }
          });
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        (error) => console.log(`Could not update todo.${error.message}`)
      );
  }
  addNewTodo(userId, todoData) {
    this.http
      .post<Todo>(`${this.baseUrl}todos`, JSON.stringify(todoData))
      .subscribe(
        (response) => {
          console.log('adding task of user:' + '' + userId);
          const shapedData = {
            ...todoData,
            id: this.dataStore.todos.length + 1,
          }; //id:resonse.id
          this.dataStore.todos.push(shapedData);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        (error) => console.log(`Could not load new todo ${error.message}`)
      );
  }

  addNewPost(userId: number, postData) {
    this.http
      .post<Post>(`${this.baseUrl}posts`, JSON.stringify(postData))
      .subscribe(
        (response) => {
          console.log('adding post of user:' + userId);
          this.dataStore.posts.push(postData);
          this._posts.next(Object.assign({}, this.dataStore).posts);
        },
        (error) => console.log(`Could not load new post ${error.message}`)
      );
  }
  loadTodos() {
    this.http.get<Todo[]>(`${this.baseUrl}todos`).subscribe(
      (data) => {
        // data.forEach(x => {
        //   if (x.userId <= 5) {
        //     this.dataStore.todos.push(x);
        //   }
        // });
        this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      (error) => console.log(`Could not load todos. ${error}`)
    );
  }

  loadPosts() {
    this.http.get<Post[]>(`${this.baseUrl}posts`).subscribe(
      (data) => {
        this.dataStore.posts = data;
        this._posts.next(Object.assign({}, this.dataStore).posts);
      },
      (error) => console.log(`Could not load posts.${error.message}`)
    );
  }

  loadAll() {
    this.loadUsers();
    this.loadTodos();
    this.loadPosts();
  }

  getPosts(id: number) {
    const userPosts = this._posts.pipe(
      map((array) => array.filter((post) => post.userId == id))
    );
    return userPosts;
  }

  getTasks(id: number) {
    const userTasks = this._todos.pipe(
      map((array) => array.filter((todo) => todo.userId == id))
    );
    return userTasks;
  }
}
