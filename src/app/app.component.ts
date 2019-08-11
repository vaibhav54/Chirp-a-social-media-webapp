import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scribee';
  public name = "internshala";

  onButtclicked(){
    console.log("clicked from parent component");
  }

}
