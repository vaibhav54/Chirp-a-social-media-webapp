import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore' ;
import 'firebase/auth'; 
import 'firebase/storage'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  photourl:string;
  editorConfig : any;
  title:string;
  file: File;
  x = 1; progess;
  metaData:any;
  something ='disappear';
  disablebuttton:string = 'false';
  storageRef:firebase.storage.Reference;
  displayName; filename;
  //@Input("postId") postId: string;

  @Output('postCreated_output') postCreatedevent = new EventEmitter; 
//receives values not sends values

  constructor(public router:Router, ) { 

    var user = firebase.auth().currentUser;
    console.log("insaaaaaae");
    console.log(user.emailVerified);
 // this.displayName = firebase.auth().currentUser.displayName;
  }

  ngOnInit() {
  }
  featuredPhotoSelected(event:any){
    this.file = event.target.files[0];
    console.log("selected filename",this.file.name);
    this.metaData = {'contentType' : 'image/jpg'};
  }

   completeUploading(){
    function reload(){
      this.router.navigate(['/feed']);
    }
    this.something = 'appear';
    var storageRef = firebase.storage().ref();
    var newtitle = this.title;
    var uploadTask = storageRef.child('/photos/featured/IMG' + this.file.name)
    .put(this.file, this.metaData);
    var newrouter:Router = this.router;
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
  function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: 
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: 
        console.log('Upload is running');
        break;
    }
},
   function(error){
    console.log(error);
  },
   function() {
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    var newurl = downloadURL;
    var name = firebase.auth().currentUser.displayName;
    console.log("creating post!");
    firebase.firestore().collection("posts").add({
      displayName: name,
      title : newtitle,
      //content:this.content,
      owner:firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      postImage:newurl
    }).then((data)=>{
      console.log(data);
      window.location.reload();
     // this.postCreatedevent.emit();
    }).then(()=>{
      newrouter.navigate(['/feed']); 
    })
    .catch((error)=>{
      console.log("error from createpost sec"+error);
    })

  }).then(()=>{
console.log("done??");
})
  
})

  }
testing(){
    console.log("surprise mother")
  }

  /*
  featuredPhotoSelected(event:any){
    //this.x = this.x + 1
  console.log("processing.....");
  this.file = event.target.files[0];
  console.log("selected filename",this.file.name);
  this.metaData = {'contentType' : this.file.type};
 
    
  }

completeUploading(){
    console.log("processing.....2");
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('/photos/featured/postId_' + this.file.name).put(this.file, this.metaData);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(snapshot){

  let bytesTransferred = this.uploadTask.snapshot.bytesTransferred;
  let totalBytes =  this.uploadTask.snapshot.totalBytes;

  var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (uploadTask.snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
  },function(error){
    console.log("error occurred!");  console.log(error);
  },function(){
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
    //  var linked = downloadURL; console.log(linked);  
    }).catch((error)=>{
      console.log(error);
      if(error != null){
       // this.completeUploading();
        console.log("jai mata di!!!!");
      } 
    }).then(()=>{
    this.createPost();
    })
  }
)
  } 
*/
  crseatePost(){
    console.log("creating post!");
  firebase.firestore().collection("posts").add({
    displayName: this.displayName,
    title : this.title,
    //content:this.content,
    owner:firebase.auth().currentUser.uid,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    postImage:this.photourl
  }).then((data)=>{
    console.log("post's  daata    "+data);
    this.postCreatedevent.emit();
  }).then(()=>{
    this.router.navigate(['/feed']);
  })
  .catch((error)=>{
    console.log("error from createpost sec"+error);
  })
      
  }

 

}
