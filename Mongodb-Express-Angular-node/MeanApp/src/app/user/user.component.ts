import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {User} from '../user';
import { promise } from 'protractor';
import { Subscriber } from 'rxjs/Subscriber';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[] = [];
  constructor(private dataService: DataService) { }


  getUsers() {
    this.dataService.getUsers()
    .subscribe(
      users => {
        this.userList = users;
      }
    );
  }

  addUser(frm) {
    const newUser: User =  {
      _id: frm.value._id,
      firstName: frm.value.firstName,
      lastName: frm.value.lastName,
      email: frm.value.email
    };
    this.dataService.addUser(newUser)
    .subscribe(
      msg => {
        console.log(msg);
        this.getUsers();
      }
    );
  }

  deleteUser(id) {
    console.log('delete');
    this.dataService.deleteUser(id)
    .subscribe(
      msg => {
        console.log(msg);
        this.getUsers();
      }
    );
  }
  ngOnInit() {
    this.getUsers();
  }

}
