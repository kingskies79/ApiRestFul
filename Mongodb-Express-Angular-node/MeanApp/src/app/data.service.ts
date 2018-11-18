import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import { get } from 'selenium-webdriver/http';

@Injectable()

export class DataService {

  constructor(private http: Http) {
    }

    getUsers() {
      return this.http.get('http://localhost:3000/users')
     .map(res => res.json());
    }

    getUser(id) {
      return this.http.get('http://localhost:3000/user/' + id)
      .map(res => res.json());
    }
    addUser(user) {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/user', user, {headers: headers})
      .map(res => res.json());
    }

    updateUser(user, id) {
      console.log(id);
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      return this.http.put('http://localhost:3000/user/' + id, user, {headers: headers})
      .map(res => res.json());
    }

    deleteUser(id) {
      return this.http.delete('http://localhost:3000/user/' + id)
      .map(res => res.json());
    }

}
