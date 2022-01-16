import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppinglistService } from './services/shoppinglist.service';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import { FormsModule } from '@angular/forms';

//Declare components
@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListFormComponent
  ],
  //Import modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  //Import services
  providers: [ShoppinglistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
