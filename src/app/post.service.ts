import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from './post';

const apiUrl = `${environment.api}/api/post`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Array<Post>>(apiUrl)
  }

  getPost(id: any) {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Post>(url)
  }

  addPost(post: Post) {
    return this.http.post<Post>(apiUrl, post)
  }

  updatePost(id: any, post: Post) {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post)
  }

  deletePost(id: any) {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Post>(url)
  }

}
