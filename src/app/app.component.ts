import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testingPusher';
  constructor(
    private _dataServiceService: DataServiceService
  ) {

  }
  placeOrder() {
    alert('test');
  }
}
