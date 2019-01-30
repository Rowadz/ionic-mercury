import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FollowersService, Follower } from './followers.service';
import { Observable } from 'rxjs';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
  providers: [FollowersService]
})
export class FollowersPage implements OnInit {
  @Input() id: number;
  @Input() option: boolean;
  followers$: Observable<Follower[]>;
  constructor(
    private readonly modalController: ModalController,
    private readonly followersService: FollowersService
  ) {}

  ngOnInit() {
    if (this.option) {
      this.followers$ = this.followersService.getFollowing(this.id);
    } else {
      this.followers$ = this.followersService.getFollowers(this.id);
    }
  }

  close() {
    this.modalController.dismiss(`modal${this.id}`);
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
}
