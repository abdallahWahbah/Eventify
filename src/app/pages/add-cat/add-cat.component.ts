import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrl: './add-cat.component.scss'
})
export class AddCatComponent {

  @ViewChild("form") formData: NgForm;
  isLoading: boolean = false;

  constructor(private http: HttpClient){}

  onSubmit()
  {
    const catValue = this.formData.value.catVal;
    const catLabel = this.formData.value.label;
    const catIcon = this.formData.value.image;
    this.isLoading = true;
    this.http.post(
      "/api/categories/new",
      {
        value: catValue,
        label: catLabel,
        icon: catIcon,
      }
    )
    .subscribe(
      response => {
        console.log(response)
        this.isLoading = false;
      },
      error =>{
        console.log(error)
        this.isLoading = false;
      }
    )
  }
}
