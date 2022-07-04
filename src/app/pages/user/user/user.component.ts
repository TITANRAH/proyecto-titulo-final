import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { SqliteManagerService } from '../../../services/sqlite-manager.service';
import { AlertService } from '../../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user: User;
  edit: boolean;

  @Output() close: EventEmitter<boolean>;


  users: User[] = [];
  

  constructor(private sqliteManagerService: SqliteManagerService,
              private alertService: AlertService,
              private translate :TranslateService) {
                this.edit = false;
                this.close = new EventEmitter<boolean>();
               }

  ngOnInit() {
    if (!this.user) {
      this.user = new User();
    } else {
      this.edit = true
    }
  }

  createEditUser(){
    if (this.edit) {
      // Editar clase
      this.sqliteManagerService.updateUser(this.user).then(() => {
        console.log('Se ha actualizado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.edit.student')
        )
        this.closeForm();
      })
    } else {
      // Crear clase
      this.sqliteManagerService.createUser(this.user).then(() => {
        console.log('Se ha insertado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.student')
        )
        this.closeForm();
      })
    }
  }


  getUsers(search?: string) {
    this.sqliteManagerService.getUser(search).then(users => {
      this.users = users;
     
      console.log(users);
    })
  }

  closeForm() {
    this.close.emit(true);
  }

}
