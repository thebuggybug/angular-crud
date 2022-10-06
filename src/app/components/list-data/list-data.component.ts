import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
// import {addProduct} from 'src/app/components/dialog/dialog.component';


@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'productCategory', 'productQuality', 'productPrice', 'productComment', 'date', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
 this.api.getProducts().subscribe({
    next: (data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
    error: (error) => {
      console.log(error);
      alert('Error while fetching data');
    }
 })
}

editProduct(row:any) {
  this.dialog.open(DialogComponent, { 
    width: '600px',
    data: row
   }).afterClosed().subscribe(result => {
    if(result == 'update'){
      this.getProducts();
    }
   })
}

deleteProduct(id:number) {
  this.api.deleteProduct(id).subscribe({
    next: (data) => {
      console.log(data);
      alert('Product deleted successfully');
      this.getProducts();
    },
    error: (error) => {
      console.log(error);
      alert('Error while deleting data');
    }
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
