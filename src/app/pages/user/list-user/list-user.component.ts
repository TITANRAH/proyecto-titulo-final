import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {

 

  users: User[];
  userSelected: User;
  showForm: boolean;

  constructor(private sqliteManagerService: SqliteManagerService) { 
    this.users = [];
    this.showForm = false;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(search?){
    this.sqliteManagerService.getUser(search).then(users => {
      this.users = users;
      console.log('users desde list user',users);
      
    })
  }

  closeForm() {
    this.showForm = false;
    this.userSelected = null;
    this.getUsers();
  }

  filterListUser($event) {
    console.log($event);
    this.getUsers($event.currentTarget.value);
  }

  editUser(user: User) {
    this.userSelected = user;
    this.showForm = true;
  }
}
