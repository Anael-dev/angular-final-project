import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userData: User = {
    id: 0,
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  };
  addAction: boolean;

  constructor(private utils: UtilsService, private router: Router) {}

  submitForm(form) {
    if (this.addAction) {
      if (form.valid) {
        this.utils.addNewUser(this.userData);
      }
    }

    this.router.navigate(['']);
  }
  ngOnInit(): void {}
}
