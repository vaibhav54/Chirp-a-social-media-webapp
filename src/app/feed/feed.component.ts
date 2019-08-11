import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
 user:any = {};
id:any;
 posts:any[] = [];
  // all the firebase data with be retrived under posts array
  // to get the value from DB we will always use 'posts array'

  constructor() { 
    this.id = firebase.auth().currentUser.uid;
    console.log("ye id hai bhai "+this.id);
    this.getPosts();
    this.getDetails(this.id);
  }


  ngOnInit() {
  }
  getDetails(id:string){

    firebase.firestore().collection("users").doc(id).get().then((response)=>{
    this.user = response.data();
    this.user.id = response.id;
    console.log(this.user);
  }).catch((error)=>{
    console.log(error);
  })
  }
  getPosts(){
    firebase.firestore().collection("posts")
    .orderBy("created","desc")
    .get().then((querysnapshot)=>{
      console.log(querysnapshot.docs); 
      this.posts = querysnapshot.docs;
    })
}  

createPost(){
  this.posts = [] ;
  this.getPosts();
  }
  
refresh_post(){
  this.posts = [];
  this.getPosts();
  }

}
