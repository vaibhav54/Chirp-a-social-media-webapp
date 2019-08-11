import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { provideRoutes} from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatProgressBarModule 
} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { AngularFireModule } from 'angularfire2';
//import {AngularFireDatabaseModule} from 'angularfire2/database'; 
//import { FormsModule } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TrialComponent } from './trial/trial.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentComponent } from './comment/comment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileViewComponent } from './edit-profile/profile-view/profile-view.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { ImageComponent } from './image/image.component';

let config = { 
  apiKey: "AIzaSyC82cr8hT-ygxvIz_I9kIB6DM0fI_C10dA",
  authDomain: "scribeefb.firebaseapp.com",
  databaseURL: "https://scribeefb.firebaseio.com",
  projectId: "scribeefb",
  storageBucket: "scribeefb.appspot.com", 
  messagingSenderId: "867139497501"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TrialComponent,
    SignupComponent,
    LoginComponent,
    FeedComponent,
    ProfileComponent,
    HomeComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentComponent,
    EditProfileComponent,
    ProfileViewComponent,
    ViewProfileComponent,
    ImageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule, 
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule,
    AngularFontAwesomeModule
   // AngularFireModule,
    //AngularFireDatabaseModule
    
  ],  
  exports: 
  [ MatButtonModule,  
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatRippleModule],

  providers: [],
  bootstrap: [AppComponent],  
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
