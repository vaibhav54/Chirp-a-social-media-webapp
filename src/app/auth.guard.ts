import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
 
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  user = firebase.auth().currentUser;
 // change:boolean = false;

  constructor(private router : Router){}

  //providing access if user is logged in
  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve,reject)=> {

      //'user' object will return true if user is logged in, otherwise return null//
      firebase.auth().onAuthStateChanged((user) => {
        if(user)
        { 
         // this.change = true; console.log("earth");
         resolve(true);
        }
        else {  this.router.navigate(['/login']) ; 
          resolve(false);  }
      })
    
    })
  }
}
