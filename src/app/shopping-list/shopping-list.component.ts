import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../models/Shoppinglist';
import { ShoppinglistService } from '../services/shoppinglist.service';

//Default Angular for components
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

//Component logic
export class ShoppingListComponent implements OnInit {

  //Contructor with the service
  constructor(private _service: ShoppinglistService) { }

  //Variables
  shoppinglists:Shoppinglist[] = [];
  shoppinglist:Shoppinglist = new Shoppinglist();
  showForm:boolean = false;
  isNew:boolean = false;

  //Method to run on load
  ngOnInit(): void {
    //Get shoppinglists
    this._service.getShoppinglists().subscribe(
      data=> {
        this.shoppinglists = data;
      }
    );
  }

  //Add new shoppinglist
  addNewShoppinglist() {
    this.shoppinglist = new Shoppinglist();
    this.showForm = true;
    this.isNew = true;
  }

  //Edit shoppinglist
  editShoppinglist(shoppinglist: Shoppinglist) {
    this.shoppinglist = shoppinglist;
    this.showForm = true;
    this.isNew = false;
  }

  //Add new shoppinglist to list of shoppinglists in parent component
  onNotifyAdd(shoppinglist: Shoppinglist):void {
    this.shoppinglists.push(shoppinglist)
  }

  //Remove shoppinglist from list of shoppinglists in parent component
  onNotifyRemove(shoppinglist: Shoppinglist):void {
    let index = this.shoppinglists.findIndex(x => x._id === shoppinglist._id);
    this.shoppinglists.splice(index,1);
  }

  //Update shoppinglist in list of shoppinglists in parent component
  onNotifyUpdate(shoppinglist: Shoppinglist):void {
    let index = this.shoppinglists.findIndex(x => x._id === shoppinglist._id);
    this.shoppinglists[index] = shoppinglist;
  }
 
  //Closes the form 
  onCloseForm(close: any) :void {
    this.showForm = close;
  }

}
