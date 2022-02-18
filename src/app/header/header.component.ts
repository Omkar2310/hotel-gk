import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService } from '../shared/cart.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  count: number = 0;
  constructor(
    public fireAuth: AngularFireAuth,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe((data) => {
      // console.log(data);

      for (let item of data) {
        this.count += item.qty;
      }
    });
    this.fireAuth.authState.subscribe((data) => {
      if (data != null) {
        this.user = new User(data.email!, data?.displayName!, data?.uid);
      }
      // console.log(this.user);
    });
  }
}
