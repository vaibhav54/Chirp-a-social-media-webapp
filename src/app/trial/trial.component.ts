import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {


    loggedIn : boolean = false;
   // user :any = {} ;
    id:any;

  constructor() {
    
   // let userId= firebase.auth().currentUser.userId;
    //console.log("userid is"+userId);
   /*
    this.user = firebase.auth().currentUser;

    if(this.user){ this.loggedIn = true;}
    else {this.loggedIn = false;}
    */
    
    //        *************try uncommenting the above 

    firebase.auth().onAuthStateChanged((user)=>
  { 
    if(user) {
      this.loggedIn = true;
      this.id = user.uid;
    }
    else {this.loggedIn = false;}

  })
}
user = firebase.auth().currentUser;

  
 ngOnInit() {
    
  }
  logout(){
    firebase.auth().signOut();
  }
 

}
