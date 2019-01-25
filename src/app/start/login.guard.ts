import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly storage: Storage,
    private readonly location: Location
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let user = await this.storage.get('curr_user');
    try {
      user = JSON.parse(user);
      if (user.user.id) {
        this.location.back();
        return false;
      }
    } catch (error) {
      return true;
    }
  }
}
