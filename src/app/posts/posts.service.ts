import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../services/authen.service';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private END_POINT: string = environment.api;
  private postSubject: Subject<Post[]>;
  private currentPage = 1;
  private lastPage: number;
  private posts: Post[] = [];
  loadingMore = false;
  constructor(private readonly http: Http) {
    this.postSubject = new Subject();
  }

  paginatePosts(page: number = 1): Observable<Post[]> {
    this.loadingMore = true;
    return this.http.get(`${this.END_POINT}/posts?page=${page}`).pipe(
      map(r => r.json()),
      map((r: any) => {
        this.currentPage = r.current_page;
        this.lastPage = r.last_page;
        if (this.currentPage === this.lastPage) {
          throw new Error('no more posts');
        }
        return r.data;
      }),
      map((posts: Post[]) => {
        this.posts.push(...posts);
        this.postSubject.next([...posts, ...this.posts]);
        this.loadingMore = false;
        return posts;
      })
    );
  }

  nextPage() {
    this.paginatePosts(++this.currentPage).subscribe();
  }

  subToPostsStream(): Subject<Post[]> {
    return this.postSubject;
  }
}

export interface Post {
  id: number;
  user_id: number;
  user: Partial<User>;
  tag_id: number;
  tag: Tag;
  header: string;
  body: string;
  location: string;
  quantity: string;
  status: string;
  video_link: string;
  post_images: PostImages[];
  created_at: Date;
  updated_at: Date;
}

export interface Tag {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostImages {
  id: number;
  post_id: number;
  location: string;
  created_at: Date;
  updated_at: Date;
}
