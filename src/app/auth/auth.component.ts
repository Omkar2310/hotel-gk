import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../shared/user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  isSignedIn = false;
  error: string = '';
  user!: User;
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((data) => {
      console.log(data);

      if (data != null) {
        this.user = new User(data.email!, data?.displayName!, data?.uid);
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthForm(authForm: NgForm) {
    // console.log(authForm.value);

    if (!this.isLoginMode) {
      this.authService.signUpEmailAndPassword(
        authForm.value.email,
        authForm.value.password,
        authForm.value.name
      );
      this.router.navigate(['/']);
    } else {
      this.authService.signInEmailAndPassword(
        authForm.value.email,
        authForm.value.password
      );
      this.router.navigate(['/']);
    }

    authForm.reset();
  }

  onGoogleSignIn() {
    this.authService.signIn();
    this.authService.storeUser(this.user);
    this.router.navigate(['/']);
  }

  signOut() {
    this.authService.signOut();
  }
}
