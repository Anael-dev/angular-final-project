import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userData = {
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  };
  addAction: boolean;

  constructor(private utils: UtilsService, private location: Location) {}

  submitForm(form) {
    if (this.addAction) {
      if (form.valid) {
        this.utils.addNewUser(this.userData);
      }
    }

    this.location.back();
  }
  ngOnInit(): void {}
}
