import { Component, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  msg: string = "";
  userError:string ="";
  user = firebase.auth().currentUser;
  phoneNumber:number;
  random : number = Math.floor(Math.random() * 10);
  myForm: FormGroup;
 @Output('user')any = {};

  constructor(public fb: FormBuilder, public authService : AuthService, public router:Router) { 
    let  msg: string = "";
 //   let user = firebase.auth().currentUser;
 firebase.auth().languageCode = 'it';

    let userError:string ="";
  this.myForm = this.fb.group({
    firstName:['', [Validators.required]],
    lastName: ['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(8)]],
    conPass:['',[Validators.required]] 
  })

  }

  onSubmit(signupform){
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;


    let email: string = signupform.value.email;
    let password:string = signupform.value.password;
    let conPassword :string = signupform.value.conPass; 

    if(password == conPassword){
    this.authService.signup(firstName,lastName, email,password)
    .then(()=>{
      let user = firebase.auth().currentUser;

     /*   console.log( "user id===     =========" + user.uid);
      
      firebase.firestore().collection("users").doc(user.uid).set({
          
        firstName:signupform.value.firstName,
        lastName:signupform.value.lastName,
        displayName:signupform.value.firstName + " " + signupform.value.lastName,
        email:signupform.value.email,
        userId:user.uid,
        photoURL:"https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png",
        interests:"",  
        hoobies:"",
        bio:"",
      })  */
    
  /*    else{
      this.msg = "Password and Confirm Password's value should be same";
      console.log(this.msg);
      }*/
  }).then(()=>{
          let userId = firebase.auth().currentUser.uid;
          this.msg = "signed up successfully!"
          //console.log(user);
          this.router.navigate(['/feed']); 
    

    }).catch((error)=>{
      this.userError = error.message;
      console.log('something!');
      console.log(error);
      //console.log(this.userError);
      //console.log(error.message);
    });
  
  }
  else{
    this.msg = "Password and Confirm Password's value should be same";
    console.log(this.userError); 
   }

  }
  /* useless it seems

  sendverfication(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(function() {
    console.log("email sent!?");
  }).catch(function(error) {
    console.log(error);
  })
} */ 
  ngOnInit() {

  }

}
