import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MyApp } from "./app.component";
import { AuthProvider } from "../providers/auth/auth";
import { SignupPage } from "../pages/signup/signup";
import { SigninPage } from "../pages/signin/signin";
import { ResetpasswordPage } from "../pages/resetpassword/resetpassword";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomePage } from "../pages/home/home";
import { PostsPage } from "../pages/posts/posts";
import { Facebook } from "@ionic-native/facebook";
import { SocialSharing } from "@ionic-native/social-sharing";
import { SigninwithemailPage } from "../pages/signinwithemail/signinwithemail";

var config = {
  apiKey: "AIzaSyC42cCB13TCfiaw7j33B657N_tMibgjqq4",
  authDomain: "ronaldo-c5a6b.firebaseapp.com",
  databaseURL: "https://ronaldo-c5a6b.firebaseio.com",
  projectId: "ronaldo-c5a6b",
  storageBucket: "ronaldo-c5a6b.appspot.com",
  messagingSenderId: "678893982372"
};

@NgModule({
  declarations: 
  [
    MyApp,
    HomePage,
    PostsPage,
    SignupPage, 
    SigninPage,
    ResetpasswordPage,
    SigninwithemailPage
  ],
  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: 
  [
    IonicApp
  ],
  entryComponents: 
  [
    MyApp, 
    HomePage,
    PostsPage,
    SignupPage, 
    SigninPage,
    ResetpasswordPage,
    SigninwithemailPage
  ],
  providers: 
  [
    StatusBar,
    SplashScreen,
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler 
    },
    AuthProvider,
    Facebook,
    SocialSharing
  ]
})
export class AppModule {

}
