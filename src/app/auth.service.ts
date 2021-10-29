import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.api}/api/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus = false;
  redirectUrl: string = "";

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(`${apiUrl}/login`, data).pipe(
      tap(_ => {
        this.isLoggedIn.emit(true);
        this.loggedInStatus = true;
      }));
  }

  register(data: any) {
    return this.http.post<any>(`${apiUrl}/register`, data)
  }
  
}
