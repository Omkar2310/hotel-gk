import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Menu } from 'src/app/shared/menu.model';
import { MenuService } from 'src/app/shared/menu.service';
import { MenuStorageService } from 'src/app/shared/menustorage.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css'],
})
@Injectable()
export class MenuAddComponent implements OnInit {
  menu!: Menu;
  constructor(
    private menuService: MenuService,
    private menuStorageService: MenuStorageService
  ) {}

  ngOnInit(): void {}

  onMenuAdded(formData: NgForm) {
    console.log(formData);
    const name = formData.value.menuname;
    const imageLink = formData.value.menuimg;
    const price = formData.value.price;

    this.menu = new Menu(name, imageLink, price);
    this.menuService.addMenu(this.menu); //add new menu to menuService

    this.menuStorageService.storeMenu();

    formData.reset();
  }
}
