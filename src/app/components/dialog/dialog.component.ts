import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  prodQuality = ["Brand New", "Like New", "Good", "Fair", "Poor"]

  productForm !: FormGroup;

  actionButton: string = "Add Product";


  constructor(private formbuilder:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
  
    private dialogRef:MatDialogRef<DialogComponent>
     ) { }

  ngOnInit(): void {
this.productForm = this.formbuilder.group({
  productName: ['', Validators.required],
  productCategory: ['', Validators.required],
  productQuality: ['', Validators.required],
  productPrice: ['', Validators.required],
  productComment: ['', Validators.required],
  date: ['', Validators.required],

})

// for editing product
if(this.editData){
  this.actionButton = "Update Product";
  // this.productForm.patchValue(this.editData) // this appends
  // this.productForm.setValue(this.editData) // this replaces
  this.productForm.controls['productName'].setValue(this.editData.productName)
  this.productForm.controls['productCategory'].setValue(this.editData.productCategory)
  this.productForm.controls['productQuality'].setValue(this.editData.productQuality)
  this.productForm.controls['productPrice'].setValue(this.editData.productPrice)
  this.productForm.controls['productComment'].setValue(this.editData.productComment)
  this.productForm.controls['date'].setValue(this.editData.date)

}

  }

  addProduct(){
    // alert(this.productForm)
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next: () => {
          alert("Product Added")
          this.productForm.reset()
          this.dialogRef.close('save')
        },
        error: () => {
          alert("Error")
        }
      })
    }
  }
  else{
    this.updateProduct()
  }
  }

  updateProduct(){
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next: () => {
        alert("Product Updated")
        this.productForm.reset()
        this.dialogRef.close()
        this.dialogRef.close('update')

      },
      error: () => {
        alert("Error while updating product data")
      }
  })

}
}
