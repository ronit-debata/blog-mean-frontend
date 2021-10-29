import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  categoryForm: FormGroup;
  id = '';
  catName = '';
  catDesc = '';
  catImgUrl = '';
  catContent = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: CategoryService, private formBuilder: FormBuilder) { 
    this.getCategory(this.route.snapshot.params.id);
    this.categoryForm = this.formBuilder.group({
      catName : [null, Validators.required],
      catDesc : [null, Validators.required],
      catImgUrl : [null, Validators.required],
      catContent : [null, Validators.required]
    });
  }

  ngOnInit() {
    
  }

  getCategory(id: any) {
    this.api.getCategory(id).subscribe((data: any) => {
      this.id = data._id;
      this.categoryForm.setValue({
        catName: data.catName,
        catDesc: data.catDesc,
        catImgUrl: data.catImgUrl,
        catContent: data.catContent
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCategory(this.id, this.categoryForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  categoryDetails() {
    this.router.navigate(['/category/details', this.id]);
  }

}
