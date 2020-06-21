import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean;
}

@Injectable({providedIn:"root"})
export class AuthService {
    private timerRef: any;
    constructor(private http : HttpClient, private router : Router){}
    user = new BehaviorSubject<User>(null);
    signup(email: string, password: string){
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQWcdisOXdKpD4_0JN5bbyuCa77f0P5e8',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(respData=>{
                this.handleAuth(respData.email,respData.localId,respData.idToken, +respData.expiresIn);
            })
            );
    }

    logIn(email: string, password : string){
        return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQWcdisOXdKpD4_0JN5bbyuCa77f0P5e8',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(respData=>{
            this.handleAuth(respData.email,respData.localId,respData.idToken, +respData.expiresIn);
        }));
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('usrData');
        if (this.timerRef) {
            clearTimeout(this.timerRef);
        }
    }

    autoLogout(expirationDuration:number){
        this.timerRef =  setTimeout(()=>
        {
            this.logOut();
        },expirationDuration);
    }
    autoLoging(){
        const userData :
        {
            email:string,
            id: string
            _token: string,
            _tokenExpirationDate: string
        }
        = JSON.parse(localStorage.getItem('usrData'));

        if(!userData){
            return;
        }
        const usrLoaded = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));
        if (usrLoaded.token) {
            this.user.next(usrLoaded);
            const expirationMs = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationMs);
        }
    }

    private handleAuth(email:string, userId:string, token: string, expiresIn: number ){
        const expDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(email,userId,token,expDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('usrData',JSON.stringify(user));
    }
    private handleError(errorRes : HttpErrorResponse){
        let errorMsg = 'An Unknow error ocurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg =  'This email already existis!';
                break;
            
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'User not found';
                break;
            
            case 'INVALID_PASSWORD':
                errorMsg = 'Incorrect Password, please try again';
                break;

            default:
                errorMsg = errorRes.error.error.message;
                break;
        }
        return throwError(errorMsg);
    }
}