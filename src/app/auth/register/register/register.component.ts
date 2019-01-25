import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenService } from 'src/app/services/authen.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'mercury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  attempt = false;
  errors: [];
  private registerForm: FormGroup;
  constructor(
    private readonly authenService: AuthenService,
    private formBuilder: FormBuilder,
    private readonly storage: Storage
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(3)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['']
      },
      { validator: this.checkPasswords }
    );
  }

  logForm() {
    this.attempt = true;
    this.authenService.register(this.registerForm.value).subscribe(
      (u: any) => {
        console.log(u);
      },
      (err: any) => {
        console.log(err.json());
        this.attempt = false;
      }
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
