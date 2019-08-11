import { Component, OnInit,Input } from '@angular/core';
import * as firebase from 'firebase/app';
import {ActivatedRoute} from '@angular/router';
import 'firebase/auth';
import 'firebase/firebase';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  bio; tempVar:string = "notclicked";
  displayName; hobby;
  id:any;
  user:any={}; 
  posts:any[]=[]

  //TODO: use image (advanced) javascript from w3school!

   constructor(public activatedroute:ActivatedRoute) { 
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    console.log(this.id); 
    this.getProfile(this.id);
   // this.getUserPosts(this.id);
  }
  
  getProfile(id:string){
    firebase.firestore().collection("users").doc(id).get().then((response)=>{
      this.user = response.data();
      this.user.id = response.id; this.hobby = this.user.hoobies;
      this.bio = this.user.bio; this.displayName = this.user.displayName;
      console.log(this.user.bio);
      console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    })
  }
  
  getUserPosts(id){
    firebase.firestore().collection("posts")
    .where("owner","==",id).get().
    then((response)=>{
      this.posts = response.docs;
    })
  }
  clicked(){
      if(this.tempVar == "notclicked"){
        this.tempVar = "clicked"; console.log(this.tempVar);
      }else{
        this.tempVar = "notclicked";
      }
    this.getUserPosts(this.id);
  }

  ngOnInit() {
  }

}
