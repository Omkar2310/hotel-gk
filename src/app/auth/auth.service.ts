import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Cart } from '../shared/cart.model';
import { User } from '../shared/user.model';
@Injectable()
export class AuthService {
  private userAccount: AngularFirestoreCollection<User>;
  // user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userAccount = afs.collection<User>('users');
    // this.user = new User('', '', '');
  }

  signIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }

  signOut() {
    this.afAuth.signOut();
  }

  signUpEmailAndPassword(email: string, password: string, name: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((data) => {
      // console.log(data.user);

      this.afs.collection('users').doc(data.user?.uid).set({
        email: data.user?.email,
        name: name,
        uid: data.user?.uid,
      });
    });
    // this.afs.collection('users')
  }
  signInEmailAndPassword(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((data) => {
      // console.log(data);
    });
  }

  storeUser(user: User) {
    // this.user = user;
    const res = this.afs
      .collection('users')
      .doc(user.uid)
      .set(Object.assign({}, user));
  }

  getCurrentUser() {
    this.afAuth.authState.subscribe((data) => {
      return data;
    });
  }

  async storeOrder(uid: string, cart: Cart[]) {
    // console.log(cart);

    let newcart: Cart = cart[0];
    // console.log(this.user.uid);
    // for (let item of cart)
    let curdate = new Date().toString();
    // console.log(curdate);
    for (let item of cart) {
      const res = await this.afs
        .collection(`users/${uid}/cart/${curdate}/order`)
        .add(Object.assign({}, item))
        .then((data) => {
          // console.log('Added Cart');
          // this.retriveDataFromFireStore();
        });
    }
  }
}
