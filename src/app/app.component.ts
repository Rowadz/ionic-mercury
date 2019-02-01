import { Component } from '@angular/core';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenService, User } from './services/authen.service';
import { Router } from '@angular/router';
import { NotificationService } from './shared/notification.service';
import { ProfilePage } from './profile/profile.page';
import { FollowersPage } from './followers/followers.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user: User;

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly authService: AuthenService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly modalController: ModalController,
    private readonly localNotifications: LocalNotifications
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
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'das' }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  async showModal(componentName: string, option?: boolean) {
    const id = await this.authService.getUserId();
    const comp = this.getComponenet(componentName);
    const componentProps = {
      id,
      option
    };
    if (!option) {
      delete componentProps.option;
    }
    const modal = await this.modalController.create({
      component: comp,
      id: `modal${id}`,
      componentProps,
      animated: true,
      showBackdrop: true
    });
    return await modal.present();
  }

  private getComponenet(componentName: string) {
    switch (componentName) {
      case 'FollowersPage':
        return FollowersPage;
      case 'ProfilePage':
        return ProfilePage;
    }
  }

  private subToNotifications(id: number) {
    // this.notificationService.listen(id);
  }
}
