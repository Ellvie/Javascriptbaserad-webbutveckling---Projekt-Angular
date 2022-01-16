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
        return this.http.get('http://localhost:3000/shoppinglists')
    }

    //POST
    postShoppinglist(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.post('http://localhost:3000/shoppinglists', shoppinglist);
    } 

    //DELETE
    deleteShoppinglist(id: string): Observable<any> {
        return this.http.delete('http://localhost:3000/shoppinglists/' + id);
    }

    //PUT
    putShoppinglist(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.put('http://localhost:3000/shoppinglists/' + shoppinglist._id,shoppinglist);
    }
}

