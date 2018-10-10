import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Facebook } from "@ionic-native/facebook";

@IonicPage()
@Component({
  selector: "page-posts",
  templateUrl: "posts.html"
})
export class PostsPage {
  isLoggedIn: boolean = false;
  users: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    private fb: Facebook
  ) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }
  createPosts() {
    // Share via email
    this.socialSharing
      .shareViaEmail("Body", "Subject", ["recipient@example.org"])
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      });
  }

  postInFacebook() {
   
    
    // FB.ui(
    //   {
    //     method: 'share',
    //     href: 'https://developers.facebook.com/docs/',
    //   },
    //   // callback
    //   function(response) {
    //     if (response &amp;&amp; !response.error_message) {
    //       alert('Posting completed.');
    //     } else {
    //       alert('Error while posting.');
    //     }
    //   }
    // );
  }
}
