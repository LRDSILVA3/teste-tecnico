import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private breakpointOberver:BreakpointObserver,public LoaderService:LoaderService) { }

  ngOnInit(): void {
  }

}
