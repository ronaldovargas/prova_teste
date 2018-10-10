import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "./user";
import * as firebase from "firebase/app";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

import { Observable } from "rxjs/Observable";
import { Platform } from "ionic-angular";
@Injectable()
export class AuthProvider {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    public storage:Storage
  ) {}

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  // signInWithFacebook() {
  //   return this.facebook
  //     .login(["public_profile", "email"])
  //     .then((res: FacebookLoginResponse) => {
  //       //https://developers.facebook.com/docs/graph-api/reference/user
  //       //Ao logar com o facebook o profile do usuario é automaticamente atualizado.
  //       return this.angularFireAuth.auth.signInWithCredential(
  //         firebase.auth.FacebookAuthProvider.credential(
  //           res.authResponse.accessToken
  //         )
  //       );
  //     });
  // }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is("cordova")) {
        return this.fb.login(["email", "public_profile"]).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
            res.authResponse.accessToken
          );
          this.angularFireAuth.auth
            .signInWithCredential(facebookCredential)
            .then(() => {
              this.storage.set("user",{user:res.authResponse.accessToken});
              observer.next();
            })
            .catch(error => {
              //console.log(error);
              observer.error(error);
            });
        });
      } else {
        return this.angularFireAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(() => {
            observer.next();
          })
          .catch(error => {
            //console.log(error);
            observer.error(error);
          });
      }
    });
  }

  signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
