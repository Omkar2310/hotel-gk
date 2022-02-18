import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem: Cart[] = [];
  cartChanged = new Subject<Cart[]>();
  addItemToCart(cart: Cart) {
    this.cartItem.push(cart);
    this.cartChanged.next(this.cartItem);
  }

  getCart() {
    return this.cartItem.slice();
  }

  getCount() {
    let count = 0;
    for (let item of this.cartItem) {
      count += item.qty;
    }
    return count;
  }
}
