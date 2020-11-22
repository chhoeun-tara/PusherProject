import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  localstorageOrder = 'orders';
  dataTable = [];

  constructor() {
    const pusher = new Pusher('30c2132fd5e3962a8b41', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('reportFunction');
    channel.bind('updateEvent', data => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    let data = JSON.parse(localStorage.getItem(this.localstorageOrder));
    data = data ? data : [];
    data.forEach(element => {
      if (element.detail.length > 0) {
        const totalAmount = element.detail.map(m => m.amount).reduce(function (a, b) { return a + b; });
        element.totalAmount = totalAmount;
      } else {
        element.totalAmount = 0;
      }
    });
    this.dataTable = data;
  }

}
