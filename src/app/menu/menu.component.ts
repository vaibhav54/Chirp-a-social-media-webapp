import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 // name:string = "vaibhav";
  sum1=23;
  sum2=31;
  sum01:number;
  sum02:number;
  result01:number;
  result;

  public people:any[]= [{
      "name":"vaibhav",
      age:12,
      "city":"durg"
  },
  {
    "name":"ankit",
    age:15,
    "city":"bhilai"
},
{
  "name":"bklrahul",
  age:17,
  "city":"chennai"
}]



  constructor() { }
 
 resultfun(){
    this.result01 =this.sum01 + this.sum02;
  }
  onClick(){
    this.result = this.sum1 + this.sum2;

  }
 

  ngOnInit() {
  }

}
