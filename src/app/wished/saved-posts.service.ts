import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../posts/posts.service';

@Injectable({
  providedIn: 'root'
})
export class SavedPostsService {
  private END_POINT: string = environment.api;

  constructor(private readonly http: Http) {}

  getWishedPosts(userId: number): Observable<Post[]> {
    return this.http
      .get(`${this.END_POINT}/getWishedPosts/${userId}`)
      .pipe(map(r => r.json()));
  }
}
