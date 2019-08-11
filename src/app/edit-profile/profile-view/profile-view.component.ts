import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
 @Input() user :any;
  constructor() { 
    console.log("profile view!");
    console.log(this.user);
  }

  ngOnInit() {
  }

}
