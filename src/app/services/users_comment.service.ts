import { UserFull } from './../views/users-crud/userFull';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersCommentService {
  private  API='http://jsonplaceholder.typicode.com/comments?postId=';
  constructor(private http:HttpClient) {}

  listIdComment(lineSelected ):Observable<{id:number,name:string,email:string
  }[]>{
    return this.http
    .get<Comment[]>(this.API = this.API+lineSelected.id).pipe(
     map(dadosUser=>{

      this.API = 'http://jsonplaceholder.typicode.com/comments?postId=';

        return dadosUser.map(b =>{
         lineSelected = b
          return{
            id:lineSelected.id,
            name:lineSelected.name,
            email:lineSelected.email,
            body:lineSelected.body,

          }

        })
      })
    )}
}
