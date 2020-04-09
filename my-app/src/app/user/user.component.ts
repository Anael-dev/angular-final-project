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
  clickedRoute: boolean = false;
  dataVisible: boolean = false;
  updateAction: boolean = false;
  deleteAction: boolean = false;
  disableBtn: boolean = false;
  // zipPattern = '^d{5}(?:[-s]d{4})?$';

  @Input() userData: any;

  constructor(private utils: UtilsService) {}

  toggleColor() {
    this.clickedRoute = !this.clickedRoute;
  }
  submitForm(f) {
    if (f.form.valid) {
      if (this.updateAction) {
        console.log('update action');
        console.log(f.value);

        this.updateAction = false;
        console.log(`from submiting in comp: ${this.userData.name}`);
        this.utils.updateUser(this.userData.id, this.userData);
      }
      if (this.deleteAction) {
        console.log('delete action');
        console.log(f.value);
        this.deleteAction = false;
        this.utils.removeUser(this.userData.id);
      }
    } else {
      console.log(
        'form invaild' + '' + f.errors.required ? 'required' : 'else'
      );
    }
  }
  ngOnInit(): void {
    console.log(this.userData);
    this.completed = this.utils.getTasks(this.userData.id).allCompleted;
    this.todos = this.utils.getTasks(this.userData.id).userTasks;
  }
}
