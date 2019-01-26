import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenService, User } from './services/authen.service';
import { Router } from '@angular/router';
import { NotificationService } from './shared/notification.service';
import { ProfilePage } from './profile/profile.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    public modalController: ModalController
  ) {
    this.initializeApp();
    this.subToUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private subToUser() {
    this.authService.user.subscribe((u: User) => {
      this.user = u;
      // this.subToNotifications(+this.user.id);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  async showProfile() {
    const id = await this.authService.getUserId();
    const modal = await this.modalController.create({
      component: ProfilePage,
      id: `profile${id}`,
      componentProps: { id },
      animated: true,
      showBackdrop: true
    });
    return await modal.present();
  }

  private subToNotifications(id: number) {
    // this.notificationService.listen(id);
  }
}
