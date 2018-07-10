import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
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
export class SigninComponent implements OnInit {

  public error: string;
  public currentState: string ='shown';
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      emailUser: ['', [Validators.required]],
      passwordUser: ['', [Validators.required]]
    });
  }

  public submit(): void{
    if(this.form.valid){
      this.authService.signin(this.form.value).subscribe( () => {
        this.router.navigate(['/profile']);
      }, err => {
        this.error = err.error;
      });
    }
  }

}
