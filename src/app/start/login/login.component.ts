import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenService, User } from 'src/app/services/authen.service';
import { Storage } from '@ionic/storage';
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
    private readonly storage: Storage
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
        console.log(u);

        alert('cool');
      },
      (err: any) => {
        alert(' no t cool');
        this.attempt = false;
      }
    );
  }
  ngOnInit() {}
}
