import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {User} from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
      user: User [] = [];
       
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getUser(id);
}

getUser(id) {
  this.dataService.getUser(id)
  .subscribe(
    user =>
    this.user = user
  );
}

editUser(fn, ln, em) {
  console.log('Edit user');
  const id = this.route.snapshot.params['id'];
  const newUser: User = {
    _id: id,
    firstName: fn,
    lastName: ln,
    email: em
  };
  this.dataService.updateUser(newUser, id)
  .subscribe(
    msg =>
    console.log(msg)
  );
  this.router.navigate(['/user']);
}

}
