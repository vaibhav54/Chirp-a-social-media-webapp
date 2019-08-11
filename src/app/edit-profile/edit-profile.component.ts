import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user :any = {}
  message :string;
  constructor() {
    this.getProfile();
   }

  ngOnInit() {
  }

  getProfile(){
    let userId = firebase.auth().currentUser.uid;
      console.log(userId);

    firebase.firestore().collection("users").doc(userId).get().then((response)=>{
      this.user = response.data();
      this.user.id = response.id;
      //this.user.displayName = this.user.firstName + " " +this.user.lastName;
      console.log("this is the userrrrrrr"+this.user);
    }).catch((error)=>{
      console.log(error);
    })
  }

update(){
  this.message = "update profile";    
/*
  firebase.auth().currentUser.updateProfile({
      displayName:this.user.displayName,
      photoURL:this.user.photoURL
  }).then(()=>{ */
    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection("users").doc(userId).update({
      firstName:this.user.displayName.split(' ')[0],
      lastName:this.user.displayName.split(' ')[1],
      hobbies:this.user.hobbies,
      interests:this.user.interests,
      bio:this.user.bio
    }).then(()=>{
      this.message = "updated!"
    })
  //})
}
  

}
