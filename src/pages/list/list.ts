import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Pages
import { AngularFireDatabase } from 'angularfire2/database';
import { SettingsPage } from '../settings/settings';

// Providers
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
})
export class ListPage {
    nearbyUsers: any;
    friendRequestCount: any;

    constructor(
        private db: AngularFireDatabase,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userProvider: UserProvider
    ) { }

    requestFriendship(userId) {
        this.userProvider.addFriendRequest(userId);
    }

    showRequests() {
        this.navCtrl.push(SettingsPage);
    }

    ionViewDidLoad() {
        this.nearbyUsers = this.userProvider.nearbyUsers.map(users => {
            return users.filter(user => user.key !== this.userProvider.id).map(user => ({ key: user.payload.key, ...user.payload.val() }));
        });

        this.db.list(`users/${this.userProvider.id}/friends`).snapshotChanges().map(list => list.length).subscribe(yes => {
            console.log(yes);
        });
    }

}
