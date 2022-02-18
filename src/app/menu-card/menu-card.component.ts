import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

import { Menu } from '../shared/menu.model';
import { MenuService } from '../shared/menu.service';
import { MenuStorageService } from '../shared/menustorage.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent implements OnInit {
  currentMenu: Menu[] = [];
  menuFetched: Menu[] = [];
  @Output() addToCardClicked = new EventEmitter<Menu>();
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // this.menuStorageService.fetchMenuFromStore().subscribe((data: Menu[]) => {
    //   for (let item of data) {
    //     this.menuFetched.push(item);
    //     console.log(item.imageLink);
    //   }
    // });
    this.currentMenu = this.menuService.getMenu();
  }

  onAddToCart(index: number) {
    // console.log(menu);
    // console.log(this.currentMenu[index]); gives the clicked menu
    this.addToCardClicked.emit(this.currentMenu[index]);
    // this.cardClicked.emit()
  }
}
