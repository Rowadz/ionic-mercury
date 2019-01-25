import { Component, OnInit, Input } from '@angular/core';
import { PostDataService } from './post-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../posts.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit {
  post$: Observable<Post>;
  userId: number;
  postId: number;
  bookMarked: boolean;
  disableBtn = false;
  @Input() id: number;
  constructor(
    private readonly postsService: PostDataService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly storage: Storage,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
    this.post$ = this.postsService.get(this.id);
    this.postId = this.id;
    this.getUserToken();
  }

  close() {
    this.modalController.dismiss(`post${this.id}`);
  }

  private async getUserToken() {
    let u = await this.storage.get('curr_user');
    try {
      u = JSON.parse(u);
      this.userId = +u.user.id;
      this.checkIfMarked();
    } catch (error) {}
  }

  private checkIfMarked() {
    this.postsService.isBookMarked(this.postId, this.userId).subscribe(d => {
      if (d.id) {
        this.bookMarked = true;
      } else {
        this.bookMarked = false;
      }
    });
  }

  unBookmark() {
    this.flipDisableBtn();
    this.postsService.unBookmark(this.postId, this.userId).subscribe(
      d => {
        this.showToast(d.message);
        this.flipBookMark();
        this.flipDisableBtn();
      },
      () => {
        this.showToast();
        this.flipDisableBtn();
      }
    );
  }
  bookmark() {
    this.flipDisableBtn();
    this.postsService.bookMark(this.postId, this.userId).subscribe(
      d => {
        this.showToast(d.message);
        this.flipBookMark();
        this.flipDisableBtn();
      },
      () => {
        this.showToast();
        this.flipDisableBtn();
      }
    );
  }

  private flipBookMark() {
    this.bookMarked = !this.bookMarked;
  }

  private async showToast(message: string = 'Something went wrong') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  private flipDisableBtn() {
    this.disableBtn = !this.disableBtn;
  }
}
