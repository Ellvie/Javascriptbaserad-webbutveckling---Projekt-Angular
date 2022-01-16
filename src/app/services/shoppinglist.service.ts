import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Shoppinglist } from '../models/Shoppinglist';

//Calls the API
@Injectable()
export class ShoppinglistService {

    constructor(private http: HttpClient) {     
    }

    //GET
    getShoppinglists(): Observable<any> {
        return this.http.get('https://miun-shoppinglist-api.herokuapp.com/shoppinglists')
    }

    //POST
    postShoppinglist(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.post('https://miun-shoppinglist-api.herokuapp.com/shoppinglists', shoppinglist);
    } 

    //DELETE
    deleteShoppinglist(id: string): Observable<any> {
        return this.http.delete('https://miun-shoppinglist-api.herokuapp.com/shoppinglists/' + id);
    }

    //PUT
    putShoppinglist(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.put('https://miun-shoppinglist-api.herokuapp.com/shoppinglists/' + shoppinglist._id,shoppinglist);
    }
}

