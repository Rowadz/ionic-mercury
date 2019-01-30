import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  @Input() id: number;
  user$: Observable<any>;
  followDisable = false;
  constructor(
    private readonly profileService: ProfileService,
    private readonly authSer: AuthenService,
    private readonly toastController: ToastController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getUser();
  }

  private async getUser() {
    console.log(this.id);
    this.user$ = this.profileService.getUser(
      this.id,
      await this.authSer.getUserId()
    );
  }

  follow(id: number) {
    this.flipFollowDisable();
    this.profileService.follow(id, this.authSer.userData.id).subscribe(
      d => {
        this.showToast('Done!');
        this.close();
      },
      () => {
        this.flipFollowDisable();
        this.showToast();
      }
    );
  }

  unFollow(rowId: number) {
    this.flipFollowDisable();
    this.profileService.unfollow(rowId).subscribe(
      d => {
        this.showToast('you are no longer a follower');
        this.close();
      },
      () => {
        this.flipFollowDisable();
        this.showToast();
      }
    );
  }

  close() {
    this.modalController.dismiss(`modal${this.id}`);
  }

  private flipFollowDisable() {
    this.followDisable = !this.followDisable;
  }

  private async showToast(message: string = 'Something went wrong') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
