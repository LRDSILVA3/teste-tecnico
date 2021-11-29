import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeaderService } from './../../components/template/header/header.service';
import { UsersService } from '../../services/users.service';
import { UsersIdService } from '../../services/users_id.service';
import { UsersPostService } from 'src/app/services/users_post.service';
import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { UserFull } from './userFull';
import { User } from './user';
import {Post} from './post';
import { MatTableDataSource } from '@angular/material/table';
import { ArrayFiltroPipe } from './array-filtro.pipe';
import { Comment } from './comment';
import { UsersCommentService } from '../../services/users_comment.service';

let ELEMENT_DATA: User[];
let ELEMENT_DATA2: UserFull[];
let ELEMENT_DATAPOST: Post[];
let ELEMENT_DATACOMMENT: Comment[];
@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css']
})
export class UsersCrudComponent implements AfterViewInit {
  user: User[]; /*User interface*/
  postList: Post[];
  userSelected: User[]; /*User interface*/
  lineSelected: User[];
  userSelectedTableFull: UserFull[]; /*User interface*/
  lineSelectedTableFull: UserFull[];
  lineSelectedTablePost: Post[];
  userSelectedTableComment: Comment[];


  mostrarModalProfile: boolean = false;
  mostrarModalPost: boolean = false;
  mostrarModalComment: boolean = false;
  filtro: ArrayFiltroPipe[];

  displayedColumns = ['id', 'name', 'email', 'city'];  /*user fields */
  displayedColumnsProfile = ['id', 'name','username'];/*user fields */
  displayedColumnsContact=['email','phone','website']; /*user fields */
  displayedColumnslocalization=['city','zipcode','street','suite','lat','lng'];/*user fields */
  displayedColumnsPost=['id','title'] /*user fields */
  displayedColumnsComment=['id','name','email'] /*user fields */

  dataSourceTableUsers = new MatTableDataSource<User>(ELEMENT_DATA);
  dataSourceTableProfile = new MatTableDataSource<UserFull>(ELEMENT_DATA2);
  dataSourceTablePost = new MatTableDataSource<Post>(ELEMENT_DATAPOST);
  dataSourceTableComment = new MatTableDataSource<Comment>(ELEMENT_DATACOMMENT);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private headerService: HeaderService, private serviceUser: UsersService,
     private serviceId: UsersIdService,private servicePost:UsersPostService, private serviceIdComment:UsersCommentService) {
    headerService.headerData = {
      title: 'Usuários da Rede Social',
      icon: 'account_circle',
      routeUrl: '/client',
    }
  }
  /*   using http method to import users based on User interface,
this way, when booting, users will be loaded.*/
  ngOnInit() {
    this.serviceUser.list().subscribe(dados => {
      this.user = dados;
      ELEMENT_DATA = this.user;
      this.dataSourceTableUsers = new MatTableDataSource<User>(ELEMENT_DATA);
      this.dataSourceTableUsers.paginator = this.paginator;
    })
  }

  ngAfterViewInit(): void {
    this.dataSourceTableUsers.paginator = this.paginator;
  }
  /* will return users with properties identical to the input*/
  filtrarNome(palavraChave: string) {
    if (palavraChave) {
      palavraChave = palavraChave.toUpperCase();
      ELEMENT_DATA = ELEMENT_DATA.filter(a =>
        a.name.toUpperCase().indexOf(palavraChave) >= 0)
      this.dataSourceTableUsers = new MatTableDataSource<User>(ELEMENT_DATA);
      this.dataSourceTableUsers.paginator = this.paginator;
    }
    /* if null, it will load all data*/
    if (palavraChave == '') {

      this.serviceUser.list().subscribe(dados => {
        this.user = dados;
        ELEMENT_DATA = this.user;
      })
      this.dataSourceTableUsers = new MatTableDataSource<User>(ELEMENT_DATA);
      this.dataSourceTableUsers.paginator = this.paginator;
    } else {
      /* when it is changed it will reset the data value and filter again*/
      this.serviceUser.list().subscribe(dados => {
        this.user = dados;
        ELEMENT_DATA = this.user;
      })
    }
  }
  /* when selecting the line, save the id and open the modal*/
  selectRowUser(row) {
    this.lineSelectedTableFull = row;
    this.mostrarModalProfile = !this.mostrarModalProfile;
    this.serviceId.listId(this.lineSelectedTableFull).subscribe(dados => {
      this.userSelectedTableFull = dados;
      this.dataSourceTableProfile = new MatTableDataSource<UserFull>(this.userSelectedTableFull);
    })
  }
  selectRowPost(row) {
    /*Line to open posts comments and list */
    this.lineSelectedTablePost= row;
    this.mostrarModalPost = !this.mostrarModalPost;
    this.mostrarModalComment = !this.mostrarModalComment;

    this.serviceIdComment.listIdComment(this.lineSelectedTablePost).subscribe(dados => {
      this.userSelectedTableComment = dados;
      this.dataSourceTableComment = new MatTableDataSource<Comment>(this.userSelectedTableComment);
      console.log(dados)

    })
  }
    openPostPag(){
      /*Button to open user posts and list */
      this.mostrarModalProfile = !this.mostrarModalProfile;
      this.mostrarModalPost = !this.mostrarModalPost;

      this.servicePost.listIdPost(this.lineSelectedTableFull).subscribe(dados => {
        this.postList = dados;
        ELEMENT_DATAPOST = this.postList;

        this.dataSourceTablePost = new MatTableDataSource<Post>(ELEMENT_DATAPOST);
      })
    }


  loadPag() {
    /*Refresh the table User */
    this.filtrarNome('');
  }

  refreshComment(){
    /*Refresh the table Comment */
    this.serviceIdComment.listIdComment(this.lineSelectedTablePost).subscribe(dados => {
      this.userSelectedTableComment = dados;
      this.dataSourceTableComment = new MatTableDataSource<Comment>(this.userSelectedTableComment);
    })
  }
  refreshProfile(){
    /*Refresh the table Profile */
    this.serviceId.listId(this.lineSelectedTableFull).subscribe(dados => {
      this.userSelectedTableFull = dados;
      this.dataSourceTableProfile = new MatTableDataSource<UserFull>(this.userSelectedTableFull);
    })
  }
  refreshPost(){
    /*Refresh the table Post*/
    this.servicePost.listIdPost(this.lineSelectedTableFull).subscribe(dados => {
      this.postList = dados;
      ELEMENT_DATAPOST = this.postList;

      this.dataSourceTablePost = new MatTableDataSource<Post>(ELEMENT_DATAPOST);
    })
  }
   /*clicking outside the modal closes it*/
   exitModelUser() {
    this.mostrarModalProfile = !this.mostrarModalProfile;

    /*resets the modal table to be loaded again */
    this.dataSourceTableProfile = null;
  }
  exitModelPost(){
    this.mostrarModalPost = !this.mostrarModalPost;
/*resets the modal table to be loaded again */
this.dataSourceTablePost = null;
  }
  exitModelComment(){
    this.mostrarModalComment = !this.mostrarModalComment;
    /*resets the modal table to be loaded again */
    this.dataSourceTableComment = null;
  }



}







