import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Category } from './category';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  categories: Array<Category> = [];
  loginStatus = false;

  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      console.log(status);
      if (status === true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.loginStatus = false;
  }
}
