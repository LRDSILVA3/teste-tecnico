import { UserFull } from './../views/users-crud/userFull';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UsersIdService {
  private  API='http://jsonplaceholder.typicode.com/users/';
  constructor(private http:HttpClient) {}
  listId(lineSelected):Observable<{id:number,name:string,username:string,email:string,street:string, suite:string,
    city:string,zipcode:string,lat:string,lng:string,phone:string,website:string
  }[]>{
    return this.http

    .get<UserFull[]>(this.API = this.API+lineSelected.id).pipe(
     map(dadosUser=>{
      this.API = 'http://jsonplaceholder.typicode.com/users/';

        return [dadosUser].map(b =>{
         lineSelected = b
          return{
            id:lineSelected.id,
            name: lineSelected.name,
            username: lineSelected.username,
            email:lineSelected.email,
            street:lineSelected.address.street,
            suite:lineSelected.address.suite,
            city: lineSelected.address.city,
            zipcode: lineSelected.address.zipcode,
            lat:lineSelected.address.geo.lat,
            lng:lineSelected.address.geo.lng,
            phone:lineSelected.phone,
            website:lineSelected.website,
          };
        });

      })
    );
  }}
