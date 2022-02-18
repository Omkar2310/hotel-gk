import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MenuAddComponent } from './admin/menu-add/menu-add.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from './shared/menu.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    MenuAddComponent,
    LoaderComponent,
    MenuCardComponent,
    AuthComponent,
    CartComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [MenuService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
