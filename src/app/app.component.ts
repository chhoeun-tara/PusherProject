import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './data-service.service';
import Pusher from 'pusher-js';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'testingPusher';
  order = new Order();
  isEnteredTable = false;
  newItem: Item = new Item();

  localstorageOrder = 'orders';
  constructor(
    private _dataServiceService: DataServiceService
  ) {
    let pusher = new Pusher('30c2132fd5e3962a8b41', {
      cluster: 'ap1'
    });

    let channel = pusher.subscribe('orderFunction');
    channel.bind('placeOrderEvent', data => {
      if (this.isEnteredTable) {
        this.getData();
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
  }
  totalAmount() {
    this.newItem.amount = this.newItem.qty && this.newItem.price ? this.newItem.qty * this.newItem.price : null;
  }
  removeItem(ind) {
    console.log(this.order.detail.splice(ind, 1));
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

    // let table = document.getElementById('order-table') as HTMLTableElement;
    // let tbody = table.getElementsByTagName('tbody')[0];
    // tbody.innerHTML = '';
    // data = data ? data : [];
    // for (const element of data) {
    //   const row: any = {
    //     table: element.table,
    //     itemName: element.itemName,
    //     qty: element.qty,
    //   };
    //   const newRow = tbody.insertRow();
    //   const cell1 = newRow.insertCell();
    //   const cell2 = newRow.insertCell();
    //   const cell3 = newRow.insertCell();

    //   const table = document.createTextNode(row.table);
    //   cell1.appendChild(table);
    //   const itemName = document.createTextNode(row.itemName);
    //   cell2.appendChild(itemName);
    //   const qty = document.createTextNode(row.qty);
    //   cell3.appendChild(qty);
    // }

  }
  placeOrder() {
    this._dataServiceService.confirmOrder(this.order).subscribe(data => {
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
    });
  }
}
