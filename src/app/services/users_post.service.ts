import { Post } from './../views/users-crud/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersPostService {
  private  API='http://jsonplaceholder.typicode.com/users/';
  constructor(private http:HttpClient) {}

  listIdPost(lineSelected ):Observable<{id:number,title:string
  }[]>{
    return this.http
    .get<Post[]>(this.API = this.API+lineSelected.id+"/posts").pipe(
     map(dadosUser=>{

      this.API = 'http://jsonplaceholder.typicode.com/users/';

        return dadosUser.map(b =>{
         lineSelected = b
          return{

            id:lineSelected.id,
            title:lineSelected.title,


          }

        })
      })
    )}
}
