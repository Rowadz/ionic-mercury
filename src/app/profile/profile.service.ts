import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly END_POINT = environment.api;

  constructor(private readonly http: Http) {}

  getUser(id: number, currId: number) {
    return this.http
      .get(`${this.END_POINT}/user/${id}/${currId}`)
      .pipe(map(r => r.json()));
  }

  follow(userId: number, fromId: number) {
    return this.http
      .post(`${this.END_POINT}/follow`, { userId, fromId })
      .pipe(map(r => r.json()));
  }

  unfollow(rowId: number) {
    return this.http
      .delete(`${this.END_POINT}/follow/${rowId}`)
      .pipe(map(r => r.json()));
  }
}
