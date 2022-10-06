import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private dialog:MatDialog, ) { }

  ngOnInit(): void {
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, { 
      width: '600px',
     }).afterClosed().subscribe(result => {
      if(result=='save') {
        window.location.reload();
      }
  })



}
}