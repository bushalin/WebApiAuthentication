import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      grant_type: ['password']
    });
  }

  get loginFormControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.loginForm.value);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.authService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([returnUrl]);
        },
        () => {
          this.loading = false;
          this.loginForm.reset();
          this.loginForm.setErrors({
            invalidLogin: true
          });
        }
      );
  }

}
