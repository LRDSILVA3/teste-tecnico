import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

import { HeaderData } from '../header/header-data.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }
  //Get method to replicate the data from the page selected in the header
  get title(): string{
    return this.headerService.headerData.title;
   }
   get icon(): string{
     return this.headerService.headerData.icon;
    }
    get routeUrl(): string{
     return this.headerService.headerData.routeUrl;
    }
}
