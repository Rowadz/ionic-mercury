import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../services/authen.service';

@Injectable()
export class FollowersService {
  private END_POINT: string = environment.api;
  constructor(private readonly http: Http) {}

  getFollowers(id: number): Observable<Follower[]> {
    return this.http
      .get(`${this.END_POINT}/followers/${id}`)
      .pipe(map(r => r.json()));
  }
  getFollowing(id: number): Observable<Follower[]> {
    return this.http.get(`${this.END_POINT}/following/${id}`).pipe(
      map(r => r.json()),
      map((d: Follower[]) => {
        d.map((f: Follower) => {
          for (const key in f) {
            if (key === 'other_user') {
              f.user = f['other_user'];
              delete f['other_user'];
            }
          }
          console.log(d);
        });
        return d;
      })
    );
  }
}

export interface Follower {
  id: number;
  user_id: number;
  from_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}
