import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { PostsTodosComponent } from './posts-todos/posts-todos.component';
import { TodosComponent } from './todos/todos.component';
import { TaskComponent } from './task/task.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { NewUserComponent } from './new-user/new-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { path: '', children: [] },
  { path: 'new-user', component: NewUserComponent },
  {
    path: 'posts-todos/:id',
    component: PostsTodosComponent,
    children: [
      { path: 'todos/:id', component: TodosComponent },
      { path: 'posts/:id', component: PostsComponent, outlet: 'posts' },
      { path: 'new-todo/:id', component: NewTodoComponent },
      { path: 'new-post/:id', component: NewPostComponent, outlet: 'posts' }
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    PostsTodosComponent,
    TodosComponent,
    TaskComponent,
    NewTodoComponent,
    NewUserComponent,
    NewPostComponent,
    PostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MyMaterialModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
