import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryForm: FormGroup;
  catName = '';
  catDesc = '';
  catImgUrl = '';
  catContent = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: CategoryService, private formBuilder: FormBuilder) { 
    this.categoryForm = this.formBuilder.group({
      catName : [null, Validators.required],
      catDesc : [null, Validators.required],
      catImgUrl : [null, Validators.required],
      catContent : [null, Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCategory(this.categoryForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/category/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
