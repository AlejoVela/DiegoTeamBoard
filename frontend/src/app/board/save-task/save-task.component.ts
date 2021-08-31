import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {

  registerData: any;
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;  
  selectedFile: any;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {}
    this.message = '';
    this.selectedFile = null;
  }

  ngOnInit(): void {
  }

  saveTask () {
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      this.message = 'Failed process: Incomplete Data';
      console.log(this.message);
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._boardService.saveTask(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listTask']); //después lo redirigimos al componente saveTask
          this.message = 'Task created';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      ); //suscribe nos dice que nos repondio el backend al frontend
    }
  }

  uploadImg(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg () {
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      this.message = 'Failed process: Incomplete Data';
      console.log(this.message);
      this.openSnackBarError();
      this.registerData = {};
    } else {

      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name );
      data.append('name', this.registerData.name);
      data.append('description', this.registerData.description);
      console.log(data);
      
      this._boardService.saveTaskImg(data).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listTask']); //después lo redirigimos al componente saveTask
          this.message = 'Task created';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      ); //suscribe nos dice que nos repondio el backend al frontend
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds *1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds *1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
