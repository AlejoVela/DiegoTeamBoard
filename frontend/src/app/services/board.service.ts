import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  env: string;
  constructor(private _http: HttpClient) { 
    this.env = environment.APP_URL;
  }

  saveTask(board: any){
    return this._http.post<any>( this.env + 'board/saveTask', board);
  }

  listTask() {
    return this._http.get<any>( this.env + 'board/listTask');
  }

  updateTask(board: any) {
    return this._http.put<any>(this.env + 'board/updateTask', board);
  }
  deleteTask(board: any) {
    return this._http.delete<any>(this.env + 'board/deleteTask/'+ board._id);
  }
  saveTaskImg(board: any){
    return this._http.post<any>( this.env + 'board/saveTaskImg', board);
  }
}
