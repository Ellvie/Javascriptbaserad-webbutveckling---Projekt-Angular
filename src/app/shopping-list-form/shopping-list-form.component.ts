import { Component, OnInit, Input, Output, EventEmitter   } from '@angular/core';
import { Shoppinglist } from '../models/Shoppinglist';
import { ShoppinglistService } from '../services/shoppinglist.service';

//Default Angular for component
@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styleUrls: ['./shopping-list-form.component.scss']
})

//Component logic
export class ShoppingListFormComponent implements OnInit {

  //Bindings for input
  @Input()  shoppinglist:Shoppinglist = new Shoppinglist();
  @Input()  isNew: boolean = false;

  //Binding for output
  @Output() notifyAdd = new EventEmitter<Shoppinglist>();
  @Output() notifyRemove = new EventEmitter<Shoppinglist>();
  @Output() notifyUpdate = new EventEmitter<Shoppinglist>();
  @Output() closeForm = new EventEmitter();

  //Variables
  shoppinglistItem: string = "";
  newName: string = "";

  //Contructor with the service
  constructor(private _service: ShoppinglistService) { }

  //Method to run on load
  ngOnInit(): void {
    if(!this.shoppinglist) {
      this.shoppinglist = new Shoppinglist;
      this.shoppinglist.items = [];
  } 
}

//Function to save item
  saveItem() {
    //Push to items array
    this.shoppinglist.items?.push(this.shoppinglistItem);
    //Calls API
    this._service.putShoppinglist(this.shoppinglist).subscribe();
    //Clear item form
    this.shoppinglistItem = "";
    //Sends update to list of shoppinglists names
    this.notifyUpdate.emit(this.shoppinglist);
  }

  //Function to save shoppinglist
  saveShoppinglist() {
    //Check if new name is not empty
    if(this.newName === "") {
      return;
    }
    //Set new name
    this.shoppinglist.name = this.newName;
    //Check if it's a new shoopinglist
    if(this.isNew) {
      //Call API
      this._service.postShoppinglist(this.shoppinglist).subscribe(
        data => {
          //Response is updating the shoppinglist
          this.shoppinglist = data;
          this.isNew = false;
          //Send output to parent component (Add)
          this.notifyAdd.emit(this.shoppinglist);
        });
    }    
    else{
      //Call API
      this._service.putShoppinglist(this.shoppinglist).subscribe(
        data=> {
          //Response is updating the shoppinglist
          this.shoppinglist = data;
          //Send output to parent component (Update)
          this.notifyUpdate.emit(this.shoppinglist);
        });
    }

  }

  //Function to remove item
  removeItem(i: number) {
    //Remove from array based on index
    this.shoppinglist.items?.splice(i,1);
    //Check if new shoppinglist
    if(this.isNew) {
      //Call API
      this._service.postShoppinglist(this.shoppinglist).subscribe();
      this.isNew = false;
    }    
    else{
      //Call API
      this._service.putShoppinglist(this.shoppinglist).subscribe();
    }    
  }

  //Function to delete shoppinglist
  deleteShoppinglist(deleting : Shoppinglist) :void {
    //Check if id exists
    if(deleting._id)
    {
      //Call API
      this._service.deleteShoppinglist(deleting._id).subscribe();
      //Send output to parent component (Delete)
      this.notifyRemove.emit(this.shoppinglist);
    }
      //Send output to parent component (Close form)
      this.closeForm.emit(false);
  }

}

