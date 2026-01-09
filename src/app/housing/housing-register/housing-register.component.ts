import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Address } from '../../../models/housing/addres';

@Component({
  selector: 'app-housing-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './housing-register.component.html'
})
export class HousingRegisterComponent {

  housingForm : FormGroup;

  galleryPreviews! : ArrayBuffer[];

  step: number = 0;

  imagePreview : string | ArrayBuffer | null = null;

  constructor(){
    this.housingForm = new FormGroup({
      title : new FormControl('', Validators.minLength(3)),
      number : new FormControl('', Validators.required),
      desc :  new FormControl(''),
      price : new FormControl(null),
      address : new FormControl<Address | null>(null, Validators.required),
      profilePic : new FormControl<ArrayBuffer | null>(null),
      ownerId: new FormControl(null, Validators.required)
    })
  }

  nextStep(){
    this.step++;
  }

  previousStep(){
    this.step--;
  }

  onFileSelected(event : any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.housingForm.patchValue({profilePhoto: file});
    }
  }

  onCepBlur(){
    
  }

  onGallerySelected(event : any){

  }

  removePhoto(index : number){

  }
}
