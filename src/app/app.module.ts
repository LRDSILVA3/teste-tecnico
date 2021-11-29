import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/template/nav/nav.component';
import{MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import{MatFormFieldModule}from '@angular/material/form-field';
import {MatInputModule}from '@angular/material/input';
import {MatTableModule }from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { UsersCrudComponent } from './views/users-crud/users-crud.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FooterComponent } from './components/template/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArrayFiltroPipe } from './views/users-crud/array-filtro.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './loader/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    HomeComponent,
    UsersCrudComponent,
    FooterComponent,
    ArrayFiltroPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
