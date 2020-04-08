import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  completed: boolean;
  todos: Observable<any[]>;
  clickedRoute: boolean = true;
  dataVisible: boolean = false;

  @Input() userData: any;

  constructor(private utils: UtilsService) {}

  toggleColor() {
    this.clickedRoute = !this.clickedRoute;
  }

  ngOnInit(): void {
    console.log(this.userData);
    this.completed = this.utils.getTasks(this.userData.id).allCompleted;
    this.todos = this.utils.getTasks(this.userData.id).userTasks;
    console.log(this.todos);
  }
}
