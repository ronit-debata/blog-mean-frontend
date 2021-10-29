import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category';

const apiUrl = `${environment.api}/api/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Array<Category>>(apiUrl)
  }

  getCategory(id: any) {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url)
  }

  addCategory(category: Category) {
    return this.http.post<Category>(apiUrl, category)
  }

  updateCategory(id: any, category: Category) {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, category)
  }

  deleteCategory(id: any) {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url)
  }

  
}
