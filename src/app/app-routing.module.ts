import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TrialComponent } from './trial/trial.component';
import { FeedComponent } from './feed/feed.component';
import { Profile } from 'selenium-webdriver/firefox';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { ImageComponent } from './image/image.component';
//import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
//import { ProfileViewComponent } from './edit-profile/profile-view/profile-view.component';

const routes: Routes = [{
  path:'',component: HomeComponent // trial --> navbar
},
{
  path:'view-profile/:id', component:ViewProfileComponent
},
{
  path : 'login', component:LoginComponent
},
{
  path:'signup', component:SignupComponent
},
{
path:'image', component:ImageComponent
},
{
  path:'edit-profile/:id', component:EditProfileComponent
},
{
  path:'feed',component:FeedComponent ,  canActivate:[AuthGuard]

},
{
  path:'view/:postId', component:ViewComponent
},
{
  path:'profile/:id',component:ProfileComponent,
  canActivate:[AuthGuard]
}];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [TrialComponent,LoginComponent];