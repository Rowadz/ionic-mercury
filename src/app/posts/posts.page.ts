import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from './posts.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthenService } from '../services/authen.service';
import { ModalController } from '@ionic/angular';
import { PostPage } from './post/post.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit {
  posts$: Observable<Post[]>;
  constructor(
    private readonly postsService: PostsService,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.postsService.paginatePosts().subscribe(d => console.log(d));
    this.posts$ = this.postsService.subToPostsStream();
  }

  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: PostPage,
      id: `post${id}`,
      componentProps: { id },
      animated: true,
      showBackdrop: true
    });
    return await modal.present();
  }

  async showProfile(id: number) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      id: `profile${id}`,
      componentProps: { id },
      animated: true,
      showBackdrop: true
    });
    return await modal.present();
  }

  loadMore() {
    this.postsService.nextPage();
  }
}
