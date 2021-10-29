import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/category.service';
import { PostService } from 'src/app/post.service';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  postForm: FormGroup;
  category = '';
  id = '';
  postTitle = '';
  postAuthor = '';
  postDesc = '';
  postContent = '';
  postReference = '';
  postImgUrl = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  categories: Array<Category> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder) { 
      this.postForm = this.formBuilder.group({
        category : [null, Validators.required],
        postTitle : [null, Validators.required],
        postAuthor : [null, Validators.required],
        postDesc : [null, Validators.required],
        postContent : [null, Validators.required],
        postReference : [null, Validators.required],
        postImgUrl : [null, Validators.required]
      });
    }

  ngOnInit() {
    this.getCategories();
    this.getPost(this.route.snapshot.params.id);
  }

  getPost(id: any) {
    this.api.getPost(id).subscribe((data: any) => {
      this.id = data._id;
      this.postForm.setValue({
        category: data.category,
        postTitle: data.postTitle,
        postAuthor: data.postAuthor,
        postDesc: data.postDesc,
        postContent: data.postContent,
        postReference: data.postReference,
        postImgUrl: data.postImgUrl
      });
    });
  }

  getCategories() {
    this.catApi.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/post/']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  postDetails() {
    this.router.navigate(['/post/details', this.id]);
  }

}
