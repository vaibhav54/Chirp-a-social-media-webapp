import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment : any = "";
  user: any = {};
  comments:any[] = [];
  
  @Input("postId") postId: string;

  constructor() { 
    //this.comments = [];

    }
  ngOnInit() {
   this.getComments();
  }
  postComment(){
    let user = firebase.auth().currentUser;
    firebase.firestore().collection("comments").add({
      userID:firebase.auth().currentUser.uid,
      postId:this.postId,
      createdOn:firebase.firestore.FieldValue.serverTimestamp(),
      commentText:this.comment,
      displayName:user.displayName
    })
    .then((response)=>{
      console.log("comment saved!" + response);
     // this.getComments();
      this.updateComments();
    })
    .catch((error)=>{
      console.log(error);
    })
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
  updateComments(){
    firebase.firestore().collection("comments")
    .where("postId","==",this.postId).orderBy("createdOn","desc")
    .get().then((data)=>{
        console.log(data.docs[0].data()); 
        this.comments.push(data.docs[0].data());

    }).then(()=>{
     // document.getElementById('myInput').value = "";
     this.comment = null;
    })
}
}
