import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { PostsPage } from "../posts/posts";
import { AuthProvider } from "../../providers/auth/auth";
import { SigninPage } from "../signin/signin";
import { Facebook } from "@ionic-native/facebook";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  link: any;
  post: any;
  user_id: any;
  loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public fb: Facebook,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.showFeeds();
    this.user_id = storage.get("user");
    this.loading = this.loadingCtrl.create({
      content: "Loading Please Wait..."
    });
  }

  showFeeds() {
    this.loading.present();

    this.fb
      .api(this.user_id + "/?fields=access_token", [
        "manage_pages",
        "publish_pages"
      ])
      .then(res => {
        let access_token = res.access_token;

        let facebookString =
          this.user_id + "/feed/?fields=id" + "&method=post" + "&link=" + this.link;
        if (
          this.post.facebook_message != null &&
          this.post.facebook_message != ""
        ) {
          facebookString += "&message=" + this.post.facebook_message;
        }
        facebookString += "&access_token=" + access_token;

        this.fb
          .api(facebookString, ["manage_pages", "publish_pages"])
          .then(res => {
            this.loading.dismissAll();
          })
          .catch(e => {
            this.loading.dismissAll();
          });
      })
      .catch(e => {
        console.log(e);
      });

    this.loading.dismiss();
  }

  createPosts() {
    this.navCtrl.setRoot(PostsPage);
  }

  logout() {
    this.authProvider.signOutFirebase();
    this.navCtrl.setRoot(SigninPage);
  }
}
