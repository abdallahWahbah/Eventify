import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{

  @Output() formInitialized = new EventEmitter<FormGroup>();
  @Output() fileUrl = new EventEmitter<any>();
  @Input() imageForm: FormGroup;
  // fileUrl: any;
  @Input() editableEvent: any;

  ngOnInit()
  {
    this.imageForm = new FormGroup({
      // file: new FormControl(this.editableEvent.imageFile || null, [Validators.required, this.fileValidator.bind(this)])
      file: new FormControl(this.editableEvent?.imageFile || null, [Validators.required])
    });
    this.formInitialized.emit(this.imageForm);
  }

  onFileChange(event: any)
  {
    const file = event.target.files[0];
    this.imageForm.patchValue({ file: file });

    let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			// this.fileUrl = reader.result; 
      this.fileUrl.emit(reader.result)
		}
  }
  
  fileValidator(control: FormControl)
  {
    const file = control.value;
    
    if(file)
    {
      let fileName: string;
      console.log(file)
      if (typeof file === 'string') fileName = file.split('/').pop(); // Check if the initial value is a string (URL or path)
      else if (file.name) fileName = file.name; // If the value is a File object

      if(fileName)
      {
        const fileExtension = fileName.split(".").pop().toLowerCase();
        const validExtensions = ["jpg", "png", "gif"];
        if(validExtensions.indexOf(fileExtension) === -1) return {"invalidFileType": true}
      }
      return null;
    }
  }

}
