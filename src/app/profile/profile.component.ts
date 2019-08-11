import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userVar = firebase.auth().currentUser;
  exportId:any; routerurl;
  user:any={}; 
  email:any;   something ='disappear';
  displayName:any; 
  firstName:string;
  bio:string;  
  interest:string;
  hoobies:string; 

  /** image variables */
  file: File;
  metaData:any;
  photourl:any;
  storageRef:firebase.storage.Reference;
routerone;

   posts:any[]=[];
  constructor(public activatedroute:ActivatedRoute, public router:Router) {
   console.log("url intended");
    console.log(this.router.url );
    this.routerurl = this.router.url;
this.routerone = router;

 
    this.intialization();//        remove this
    let id = this.activatedroute.snapshot.paramMap.get('id');
    console.log(id);     
    this.getProfile(id);
    this.getUserPosts(id);
  /*activated route used for differnt id routing link! */
   // console.log(id);

   } 

  ngOnInit() {
  }
  intialization(){
    firebase.firestore().collection("users").doc(this.userVar.uid).get().then((response)=>{
      console.log(response);
    })
  }

 
  featuredPhotoSelected(event:any){
    this.file= event.target.files[0];
    console.log("selected filename", this.file.name);

    this.metaData = {'contentType' : this.file.type};
   // this.storageRef = firebase.storage().ref('/photos/profile_photos/' + this.file.name)
   this.something = 'appear';

   var uploadTask = firebase.storage().ref('/images/profilepicture'+ this.file.name)
   .put(this.file, this.metaData);
  
  
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
  let bytesTransferred = snapshot.bytesTransferred;
  let totalBytes =  snapshot.totalBytes;
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  this.something = 'disappear';

  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    let userid = firebase.auth().currentUser.uid;
    let photo = downloadURL
    console.log(photo);
    firebase.firestore().collection('users').doc(userid).update({
      photoURL : downloadURL
    })
  }).then(()=>{
    window.location.reload();
  })
});
    /*this.storageRef.getDownloadURL().then((url)=>{
      this.photourltemp = url;
      console.log(url);
      console.log("photuuuu" + this.photourltemp);
    }).catch((error)=>{
      console.log(error);
    })
    */



} 
  updateInfo(){ 
    if(this.bio==null){
      this.bio = this.user.bio;
    }
    if(this.hoobies == null){
      this.hoobies = this.user.hoobies;
    }
    if(this.email == null ){
      this.email = this.user.email;
    }
    if(this.displayName == null ){
      this.displayName = this.user.displayName;
    }
  

    //user = firebase.auth().currentUser;
  console.log("hello mother");
  firebase.auth().currentUser.updateProfile({
    displayName:this.displayName,
   // photoURL:this.photourltemp
  }).then(()=>{
    
    let userid = firebase.auth().currentUser.uid;
    firebase.firestore().collection("users").doc(userid).update({
      displayName:this.displayName,
      firstName:this.userVar.displayName.split(' ')[0],
      lastName:this.userVar.displayName.split(' ')[1],
      hoobies: this.hoobies,
      bio: this.bio,
      email:this.email,
    //  interests : this.interest,
    //  photoURL: this.photourltemp,
    }).then(()=>{
      console.log("users details updated!");
    }).catch((error)=>{
      console.log(error);
    })
  })

  }
  getProfile(id:string){
  //  let userId = firebase.auth().currentUser.uid;
   //   console.log(userId);

    firebase.firestore().collection("users").doc(id).get().then((response)=>{
      this.user = response.data();
      this.user.id = response.id;
      console.log("story");
      //this.user.displayName = this.user.firstName + " " +this.user.lastName;
      console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    })
  }

  getUserPosts(id){
    firebase.firestore().collection("posts")
    .where("owner","==",id).get().then((response)=>{
      this.posts = response.docs;
    })
  }


}
