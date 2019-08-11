import { Component, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post : any = {};
  postImage: any;
  postId : string =  " ";
  constructor(public activatedRoute : ActivatedRoute) { 
    let postId = this.activatedRoute.snapshot.paramMap.get("postId");
    this.postId = postId;
  
    
    firebase.firestore().collection("posts").doc(postId).get()
    .then((response)=>{
      this.post = response.data();
      this.postImage = this.post.postImage;
      console.log(this.postImage);
      console.log(this.post);
    })

    /*.collection--a particular collection
      .doc--that particular doc (in the parameter)  in that collection
      .get()-- retrives the data*/

  }


  ngOnInit() {
  }
  postComment(){

}

}
