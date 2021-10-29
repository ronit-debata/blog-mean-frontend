import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category';
import { Post } from './post';

const apiUrl = `${environment.api}/api/public`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Array<Category>>(`${apiUrl}/category`)
  }

  getPosts() {
    return this.http.get<Array<Post>>(`${apiUrl}/post`)
  }

  getPostsByCategory(id: any) {
    return this.http.get<Array<Post>>(`${apiUrl}/bycategory/${id}`)
  }

  getPost(id: any) {
    return this.http.get<Post>(`${apiUrl}/post/${id}`)
  }

}
