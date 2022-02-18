import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../shared/cart.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  currentCart: Cart[] = [];
  user: any;
  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    //get user
    this.afAuth.authState.subscribe((data) => {
      // console.log(data?.uid);
      this.user = data;
    });
    // console.log(data);

    this.currentCart = this.cartService.getCart();
  }

  onOrderPlaced() {
    this.auth.storeOrder(this.user.uid, this.currentCart);
    this.currentCart = [];
  }
}
