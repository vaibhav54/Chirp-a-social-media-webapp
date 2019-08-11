import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg = "";
  public userError = "";
  myForm: FormGroup;
  constructor(public fb:FormBuilder, public authService:AuthService,public router:Router ) {
    
    this.myForm = this.fb.group({
        email:['',[Validators.email, Validators.required]],
        password:['',[Validators.required]]
    });
  
  }
  ngOnInit() {
  }
  onSubmit(form){
    //console.log(login.value);

    this.authService.login(form.value.email, form.value.password)
    .then((response)=>{
     // this.msg = "logging in...";
      this.router.navigate(['/feed']);
      console.log(response);
    })
    .catch((error)=>{
      //console.log(error);
      this.userError = error.message;

    });
    
  }
 



  

}
