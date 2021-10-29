import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category = { _id: '', catName: '', catDesc: '', catImgUrl: '', catContent: '' };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategoryDetails(this.route.snapshot.params.id);
  }

  getCategoryDetails(id: any) {
    this.api.getCategory(id)
      .subscribe((data: any) => {
        this.category = data;
        this.category._id = data._id;
        console.log(this.category);
        this.isLoadingResults = false;
      });
  }

  deleteCategory(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
