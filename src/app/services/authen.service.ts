import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private readonly END_POINT = environment.api;
  user: Subject<User>;
  userData: User;
  constructor(private readonly http: Http, private readonly storage: Storage) {
    this.user = new Subject();
    this.publishUser();
  }

  private async publishUser() {
    let u = await this.storage.get('curr_user');
    try {
      u = JSON.parse(u);
      if (u.user.id) {
        this.user.next(u.user);
        this.userData = u.user;
      }
    } catch (error) {}
  }

  async getUserId() {
    let u = await this.storage.get('curr_user');
    try {
      u = JSON.parse(u);
      if (u.user.id) {
        this.user.next(u.user);
        this.userData = u.user;
        console.log(u);
      }
    } catch (error) {
      throw new Error('no logged user');
    }
    return u.user.id;
  }

  logout() {
    this.storage.remove('curr_user');
    this.user.next(undefined);
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post(`${this.END_POINT}/login`, credentials).pipe(
      map(res => res.json()),
      map((u: User) => {
        // set a key/value
        this.storage
          .set('curr_user', JSON.stringify(u))
          .then(e => console.log(e))
          .catch(e => console.log(e));
        if (u.message === 'check your password and email') {
          throw new Error('bad login');
        } else {
          this.user.next(u);
          this.userData = u;
        }
        return u;
      })
    );
  }

  register(u: Partial<User>): Observable<any> {
    return this.http
      .post(`${this.END_POINT}/register`, u)
      .pipe(map(res => res.json(), map(x => x)));
  }
}

export interface Credentials {
  email: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  API_KEY: string;
  date_of_birth: Date;
  image: string;
  city: string;
  phone: string;
  about: string;
  message?: string;
}
