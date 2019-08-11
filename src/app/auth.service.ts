import { Injectable } from '@angular/core';
//import bootbox from "ngx-bootstrap"
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { resolveComponentResources } from '@angular/core/src/metadata/resource_loading';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any = firebase.auth().currentUser;
  photourl  : any = "assets/profilepic.png";
//photourl : string = "https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png";
 randomNum : number = Math.floor(Math.random() * 10);
  constructor() { }

login(email:string , password:string){
  
   return firebase.auth().signInWithEmailAndPassword(email,password)
   .then(()=>{
   })

}
signup(firstName:string, lastName:string, email:string, password:string){
return new Promise((resolve,reject)=>{
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(()=>{
    let  user = firebase.auth().currentUser;
    console.log("userrr detaillsssssss  ============ " + JSON.stringify(user.uid) );
    console.log(user.emailVerified);
  
   })
   
   /*
   .then(()=>{
     firebase.auth().currentUser.sendEmailVerification()
    .then(function() {
      window.alert("email sent successfully!");
      console.log("email sent!?");
    }).catch(function(error) {
      console.log(error);
    })
  })   */ 
  .then(()=>{
    let  user = firebase.auth().currentUser;

    console.log( "user id============" + user.uid);
      
      firebase.firestore().collection("users").doc(user.uid).set({
          
        firstName:firstName,
        lastName:lastName,
        displayName:firstName + " " + lastName,
        email:email,
        userId:user.uid,
        photoURL: "https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png",
        interests:"",  
        hoobies:"",
        bio:"",
      })
  })
  .then(()=>{
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified);

    if(user.emailVerified == false){
      window.alert('Your email is verifying.....');
      user.sendEmailVerification() 
      .then(function() {
        console.log("email sent!?");
        window.alert("Check your email to proceed.");
      }).catch(function(error) {
        console.log(error);
      })
    }
/*
    var myuser :any = {
      firstName:firstName,
      email:email
    }
    console.log(myuser);
    user.sendEmailVerification() 
  .then(function() {
    console.log("email sent!?");
  }).catch(function(error) {
    console.log(error);
  })
    console.log(" this might show user object! ");
      console.log(user.email); 
      console.log(user); */
user.updateProfile({
  displayName: firstName + " " + lastName,
  photoURL: "https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png"
}).then(function() {
console.log("updated!");
}).catch(function(error) {
  console.log("something1")
    console.log("skjiji " + error);
});
   }) 

}) 
} }
  /*  .then((response)=>{

      response.firebase.auth().currentUser.updateProfile({
        photoURL: "https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png"
      }).then(()=>{
        console.log("updated beta!")
      }) .catch(function(error) {
          console.log(error);
      });
      })
      */
    /*.then(()=>{
      var user = firebase.auth().currentUser;
  
  user.updateProfile({
    //displayName: "Jane Q. User",
    photoURL: "https://www.edgehill.ac.uk/health/files/2017/12/blank-profile.png"
  }).then(function() {
  console.log("updated!");
  }).catch(function(error) {
      console.log(error);
  });
     }) 
     */
 /*   .then((response)=>{
      //  let randomNum = Math.floor(Math.random() * 10);
    let user = firebase.auth().currentUser;

        response.user.updateProfile({
          displayName:firstName + " " + lastName,
          photoURL: "https://randomuser.me/api/portraits/lego/" + this.randomNum +".jpg"
        }).then(()=>{
          resolve(response.user);
        }).catch((error)=>{
          reject(error);
        })
       })
*/

   /*
   .then((response)=>{
  //  let randomNum = Math.floor(Math.random() * 10);

    response.user.updateProfile({
      displayName:firstName + " " + lastName,
      photoURL: "https://randomuser.me/api/portraits/lego/" + this.randomNum +".jpg"
    }).then(()=>{
      resolve(response.user);
    }).catch((error)=>{
      reject(error);
    })
   })
*/
