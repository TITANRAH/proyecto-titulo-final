import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  users: User[] = [];
  user: User;

  constructor(private sqliteManagerService: SqliteManagerService) { }

  ngOnInit() {
    if (!this.user) {
      this.user = new User();
    } 
  }

  createUser(){
    this.sqliteManagerService.createUser(this.user).then(user => {
      console.log(user);
      
    })
  }


  getUsers(search?: string) {
    this.sqliteManagerService.getUser(search).then(users => {
      this.users = users;
     
      console.log(users);
    })
  }

}
