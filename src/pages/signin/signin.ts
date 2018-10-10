import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { User } from "../../providers/auth/user";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";
import { SignupPage } from "../signup/signup";
import { SigninwithemailPage } from "../signinwithemail/signinwithemail";

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {
  user: User = new User();
  @ViewChild("form")
  form: NgForm;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authProvider: AuthProvider
  ) {}

  createAccount() {
    this.navCtrl.push(SignupPage);
  }


  signInWithEmailPage(){
    this.navCtrl.push(SigninwithemailPage);
  }
  signInWithFacebook() {
    this.authProvider
      .loginWithFacebook()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        this.toastCtrl
          .create({
            duration: 3000,
            position: "bottom",
            message: "Erro ao efetuar o login"
          })
          .present();
      });
  }
}
