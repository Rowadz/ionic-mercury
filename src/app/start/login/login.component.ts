import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenService, User } from 'src/app/services/authen.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'mercury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  attempt = false;
  private loginForm: FormGroup;

  constructor(
    private readonly authenService: AuthenService,
    private formBuilder: FormBuilder,
    private readonly storage: Storage,
    private readonly router: Router,
    public alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  logForm() {
    this.attempt = true;
    this.authenService.login(this.loginForm.value).subscribe(
      (u: User) => {
        this.router.navigate(['/posts']);
      },
      (err: any) => {
        this.attempt = false;
        this.failed();
      }
    );
  }

  private async failed() {
    const alert = await this.alertController.create({
      header: 'Failed',
      message: 'Check You email & password',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}
}
