import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private readonly END_POINT = environment.api;
  constructor(private readonly http: Http, private readonly storage: Storage) {
    this.storage
      .get('curr_user')
      .then(u => console.log(u))
      .catch(e => console.error(e));
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
        }
        return u;
      })
    );
  }
}

export interface Credentials {
  email: string;
  password: string;
}
export interface User {
  id: string;
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
