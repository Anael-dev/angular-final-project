import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersArr: Observable<User[]>;
  filteredArr: any;
  searchType: boolean = false;
  constructor(private utils: UtilsService, private router: Router) {}

  filterSearch(char: string) {
    this.searchType = true;
    let charFilter = char.toLowerCase();

    if (!charFilter) {
      console.log('Im empty');
      this.filteredArr = this.usersArr;
    }

    this.filteredArr = this.usersArr.pipe(
      map(users =>
        users.filter(user => user.name.toLowerCase().includes(charFilter))
      )
    );
    console.log(this.filteredArr);
  }
  addUser() {
    this.router.navigate(['/new-user']);
  }

  ngOnInit() {
    this.usersArr = this.utils.users;
    this.filteredArr = this.usersArr;
    this.utils.loadAll();
  }
}
