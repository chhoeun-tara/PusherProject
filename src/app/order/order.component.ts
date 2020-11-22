import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { DataServiceService } from '../data-service.service';

class Item {
  itemName: string;
  qty: number;
  price: number;
  amount: number;
}
class Order {
  table: number;
  detail: Item[] = []
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order = new Order();
  isEnteredTable = false;
  newItem: Item = new Item();

  localstorageOrder = 'orders';
  constructor(
    private _dataServiceService: DataServiceService
  ) {
    const pusher = new Pusher('30c2132fd5e3962a8b41', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('orderFunction');
    channel.bind('placeOrderEvent', data => {
      if (this.isEnteredTable && (this.order.table === data.body.table)) {
        this.order = data.body;
      }
    });
  }
  ngOnInit() {
    // this.getData();
  }
  insertItem() {
    const ind = this.order.detail.map(m => m.itemName).indexOf(this.newItem.itemName);
    if (ind !== -1) {
      this.order.detail[ind] = JSON.parse(JSON.stringify(this.newItem));
    } else {
      this.order.detail.push(this.newItem);
    }
    this.newItem = new Item();
    this._dataServiceService.order(this.order).subscribe();

  }
  totalAmount() {
    this.newItem.amount = this.newItem.qty && this.newItem.price ? this.newItem.qty * this.newItem.price : null;
  }
  removeItem(ind) {
    this.order.detail.splice(ind, 1);
    this._dataServiceService.order(this.order).subscribe();
  }
  editItem(ind) {
    this.newItem = JSON.parse(JSON.stringify(this.order.detail[ind]));
  }
  getData() {
    const table = this.order.table;
    if (this.order.table) {
      const data = JSON.parse(localStorage.getItem(this.localstorageOrder));
      const orderedTable = data ? data.filter(f => f.table === this.order.table)[0] : null;
      this.order = orderedTable ? orderedTable : new Order();
      this.order.table = table;
      this.isEnteredTable = true;
    }
  }
  placeOrder() {
    this._dataServiceService.order(this.order).subscribe(data => {
      // console.log(data)
      let lsData: any[] = JSON.parse(localStorage.getItem(this.localstorageOrder));
      lsData = lsData ? lsData : [];
      const existingTable = lsData.filter(f => f.table === this.order.table)[0];
      if (existingTable) {
        lsData = lsData.filter(f => f.table !== this.order.table);
      }
      lsData.push(this.order);
      localStorage.setItem(this.localstorageOrder, JSON.stringify(lsData));
      this.isEnteredTable = false;
      this.newItem = new Item();
      this.order = new Order();
      this._dataServiceService.report({}).subscribe();
    });
  }

}
