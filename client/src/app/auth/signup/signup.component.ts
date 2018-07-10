import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('content', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'translateY(30px)'
        }),
        animate('300ms ease-out')
      ]),
    ])
  ]
})
export class SignupComponent implements OnInit {

  public error: string;
  public currentState: string ='shown';
  public formSignup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formSignup = this.fb.group({
      firstnameUser: ['', [Validators.required]],
      lastnameUser: ['', [Validators.required]],
      emailUser: ['', [Validators.required]],
      passwordUser: ['', [Validators.required]]
    });
  }

  public submit(): void{
    if(this.formSignup.valid){
      this.authService.signup(this.formSignup.value).subscribe( (user: User) => {
        this.router.navigate(['/signin']);
      }, err => {
        this.error = err.error;
      });
    }
  }

}