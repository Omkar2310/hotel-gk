import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from './menu.model';

@Injectable()
export class MenuService {
  // menuChanged = new Subject<Menu[]>();

  private currentMenu: Menu[] = [];

  getMenu() {
    return this.currentMenu.slice();
  }

  setMenu(menu: Menu[]) {
    this.currentMenu = menu;
    // this.menuChanged.next(this.currentMenu);
  }

  addMenu(menu: Menu) {
    this.currentMenu.push(menu);
    // this.menuChanged.next(this.currentMenu);
  }
}
