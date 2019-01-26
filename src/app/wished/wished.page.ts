import { Component, OnInit } from '@angular/core';
import { SavedPostsService } from './saved-posts.service';
import { AuthenService } from '../services/authen.service';
import { Post } from '../posts/posts.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../posts/post/post.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-wished',
  templateUrl: './wished.page.html',
  styleUrls: ['./wished.page.scss']
})
export class WishedPage implements OnInit {
  wished$: Observable<Post[]>;
  constructor(
    private readonly savedPostsService: SavedPostsService,
    private readonly authService: AuthenService,
    public modalController: ModalController,
    private readonly storage: Storage
  ) {}

  ngOnInit() {
    this.loadPosts();
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

  private loadPosts() {
    this.storage
      .get('curr_user')
      .then(u => {
        try {
          u = JSON.parse(u);
          if (u.user.id) {
            this.wished$ = this.savedPostsService.getWishedPosts(u.user.id);
          }
        } catch (error) {}
      })
      .catch(e => console.error(e));
  }
}
