import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuService } from './menu.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Menu } from './menu.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuStorageService {
  // productscollection: AngularFirestoreCollection<Menu>;
  menus: Menu[] = [];
  products: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private menuService: MenuService,
    private afs: AngularFirestore,
    private db: AngularFirestore
  ) {
    // this.productscollection =
    // return this.productscollection.valueChanges();
    this.products = db
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            return a.payload.doc.data();
          });
        })
      );
    // console.log();
  }
  storeMenu() {
    const currentMenu = this.menuService.getMenu();
    this.http
      .put(
        'https://hotel-app-d584c-default-rtdb.firebaseio.com/menu.json',
        currentMenu
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  async fetchMenu() {
    // const promise_fetch =
    return (
      this.http
        .get<Menu[]>(
          'https://hotel-app-d584c-default-rtdb.firebaseio.com/menu.json'
        )
        // .pipe(
        //   tap((menu) => {
        //     this.menuService.setMenu(menu);
        //   })
        // )
        .toPromise()
    );
  }

  fetchMenuFromStore() {
    return this.products;
  }
}
