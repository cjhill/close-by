import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

// Pages
import { MainTabsPage } from '../main-tabs/main-tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    constructor(
        public afAuth: AngularFireAuth,
        private authProvider: AuthProvider,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userProvider: UserProvider
    ) { }

    isLoggedIn() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userProvider.userId = user.uid;
                this.navCtrl.push(MainTabsPage);
            }
        })
    }

    login(email: string, password: string) {
        this.authProvider.login(email, password).then(results => {
            console.log(results);
        }).catch(e => {
            let code = e.code;

            if (code.includes('user-not-found')) {
                this.register(email, password);
            }
        });
    }

    register(email: string, password: string) {
        this.authProvider.register(email, password).then(results => {
            console.log(results);
            let userId = results.uid;
            let info = {
                    name: '',
                    email: results.email,
                    avatar: '',
                    gender: ''
                };

            this.userProvider.addNewUser(userId, info);
        });
    }

    loginWithFB() {
        this.authProvider.loginWithFacebook().then(results => {
            let userId = results.user.uid,
                facebookInfo = results.additionalUserInfo.profile,
                isNewUser = facebookInfo.isNewUser;

            if (isNewUser) {
                let info = {
                    name: facebookInfo.name,
                    email: facebookInfo.email,
                    avatar: facebookInfo.picture.data.url,
                    gender: facebookInfo.gender
                };

                this.userProvider.addNewUser(userId, info);
            }
        });
    }

    ionViewDidLoad() {
        this.isLoggedIn();
    }

}
