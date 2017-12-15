import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { ChatPage } from '../chat/chat';

// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

// Pages
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    friends: any;

    constructor(
        public appCtrl: App,
        private authProvider: AuthProvider,
        private db: AngularFireDatabase,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userProvider: UserProvider
    ) { }

    logout() {
        this.authProvider.logout().then(() => {
            this.appCtrl.getRootNav().push(LoginPage);
        });
    }

    openChat(key) {
        this.navCtrl.push(ChatPage, {
            friendId: key
        });
    }

    ionViewDidLoad() {
        this.friends = this.db.list(`users/${this.userProvider.id}/friends`).snapshotChanges().map(users => {
            return users.map(user => ({ key: user.payload.key, ...user.payload.val() }));
        });
    }

}
