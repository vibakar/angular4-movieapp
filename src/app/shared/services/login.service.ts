import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LoginComponent } from '../../core/login/login.component';

@Injectable()
export class LoginService {

    constructor(private dialog: MatDialog) { }

    public loginForm(): Observable<boolean> {

        let dialogRef: MatDialogRef<LoginComponent>;

        dialogRef = this.dialog.open(LoginComponent,{
        	height:'500px',
        	width:'450px'
        });

        return dialogRef.afterClosed();
    }
}
