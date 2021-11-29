import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../views/users-crud/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

private readonly API ='http://jsonplaceholder.typicode.com/users';

  constructor(private http:HttpClient) {}
list():Observable<{id:number,name:string,email:string, address:string}[]>{

  return this.http

  .get<User[]>(this.API).pipe(


    map(dadosUser =>{

      return dadosUser.map(a =>{
        return{
          id:a.id,
          name:a.name,
          email:a.email,
          address: a.address,
        };
      });
    })
  );

}


}
