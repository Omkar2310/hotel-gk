export class Cart {
  name: string;
  imageLink: string;
  price: number;
  qty: number = 0;

  constructor(name: string, imageLink: string, price: number) {
    this.name = name;
    this.imageLink = imageLink;
    this.price = price;
  }
}
