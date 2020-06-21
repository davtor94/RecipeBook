import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData} from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = false;
  isLoading = false;
  errorMsg : string = null;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  switchLogin(){
    this.isLogin = !this.isLogin;
  }
  onSubmit(authForm : NgForm){    
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs :Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLogin){
      authObs = this.authService.logIn(email,password);
    }else{
      authObs = this.authService.signup(email,password)
    }
    authObs.subscribe((response)=>{
      this.isLoading = false;
      authForm.reset();
      this.router.navigate(['/recipes']);
    },(errorMsg)=>{
      this.errorMsg = errorMsg;
      this.isLoading = false;
    });
  }
}
