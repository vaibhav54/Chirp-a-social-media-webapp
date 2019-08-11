import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore' ;
import 'firebase/auth'; 
import 'firebase/storage';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  title; file:File; metaData:any;
  link; user:any ={};
  constructor() {
    this.getuser();
    this.getImage();
   }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
  }
  featuredPhotoSelected(event:any){
    this.file = event.target.files[0];
    console.log("selected filename",this.file.name);
    this.metaData = {'contentType' : this.file.type};
  }
  UploadImage(){
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('images/' + this.file.name).put(this.file, this.metaData);

uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
  function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    console.log("error occurred!");  console.log(error);
}, function() {
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  //  var linked = downloadURL; console.log(linked);  
    firebase.firestore().collection("images").add({
      firstname:"iski maka",
      lastname:"saki naka",
      imageName:this.file.name,
      photoURL:this.link
      })
  })
}
)
  }

addIimageInFirestore(){
firebase.firestore().collection("images").add({
  firstname:"iski maka",
  lastname:"saki naka",
  imageName:this.file.name,
  photoURL:this.link
})

}
getuser(){
  var userId = firebase.auth().currentUser;
  console.log("is it")
  console.log(userId);
}
getImage(){
  firebase.firestore().collection("images").get().then((response)=>{
    console.log(response);
  })
}
}
