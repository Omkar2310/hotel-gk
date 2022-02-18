import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

import { Menu } from '../shared/menu.model';
import { MenuService } from '../shared/menu.service';
import { MenuStorageService } from '../shared/menustorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuFetched: Menu[] = [];
  currentMenu: Menu[] = [];
  currentCart: Cart[] = [];
  subscription: Subscription;
  constructor(
    private fireAuth: AngularFireAuth,
    private menuService: MenuService,
    private menuStorageService: MenuStorageService,
    private cartService: CartService
  ) {
    if (fireAuth.authState != null) {
      this.menuStorageService.fetchMenu().then((data) => {
        this.menuService.setMenu(data);
        this.currentMenu = this.menuService.getMenu();
      });
    }
    this.subscription = this.cartService.cartChanged.subscribe((data) => {
      this.currentCart = data;
    });
  }

  ngOnInit(): void {
    //check user
    this.fireAuth.authState.subscribe((data) => {
      // console.log(data);
    });
    this.currentCart = this.cartService.getCart();

    this.menuStorageService.fetchMenuFromStore().subscribe((data: Menu[]) => {
      for (let item of data) {
        this.menuFetched.push(item);
      }
    });
  }

  getCartDetail() {
    console.log(this.cartService.getCart());
  }

  addToCart(menuClicked: Menu) {
    let cart = new Cart(
      menuClicked.name,
      menuClicked.imageLink,
      menuClicked.price
    );
    if (this.currentCart.length === 0) {
      cart.qty = 1;
      this.cartService.addItemToCart(cart);
    } else {
      //cart is not empty so check if item is repeated
      let newItem = true;
      for (let item of this.currentCart) {
        if (item.name === menuClicked.name) {
          item.qty += 1; //increment qty;
          newItem = false;
          break;
        }
      }
      if (newItem) {
        cart.qty = 1;
        this.cartService.addItemToCart(cart);
      }
    }
  }
}
