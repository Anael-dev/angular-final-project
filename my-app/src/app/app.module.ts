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

const appRoutes: Routes = [
  { path: 'new-user', component: NewUserComponent },
  {
    path: 'posts-todos/:id',
    component: PostsTodosComponent,
    children: [
      { path: 'todos/:type/:id', component: TodosComponent },
      { path: 'new-todo/:type/:id', component: NewTodoComponent },

      { path: 'todos/:type/:id', component: TodosComponent, outlet: 'posts' },

      {
        path: 'new-todo/:type/:id',
        component: NewTodoComponent,
        outlet: 'posts'
      }
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
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
