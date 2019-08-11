import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post :any;
  // not sure
  /* a simple variable 'post' which we want to import outside this class/component*/

  @Output('delete_output') deleteEvent = new EventEmitter; 
  postData : any = {};
  postImage:string;
  user : any = {};
  newUser;
  owner;
  postId;
  displayName;  
  comments:any[] = [];

  constructor(public router:Router) {

   // this.displayname = firebase.auth().currentUser.displayName;
   }

  ngOnInit() {
   
    this.postData = this.post.data();
    this.owner = JSON.stringify(this.postData.owner);
    this.postImage = this.postData.postImage;
    this.displayName = this.postData.displayName;

    this.user = firebase.auth().currentUser;
    this.newUser = JSON.stringify(this.user.uid);
    this.postId =this.post.id;
    this.getComments();

  }
  getComments(){
    firebase.firestore().collection("comments")
    .where("postId","==",this.postId).orderBy("createdOn","desc")
    .get().then((data)=>{
        data.docs.forEach((item)=>{
        this.comments.push(item.data())
        console.log(item.data());
        })
    })
}
  onDelete(){
    firebase.firestore().collection("posts").doc(this.post.id).delete()
    .then(() => {
      this.deleteEvent.emit(); 
        })
  }


  

}
