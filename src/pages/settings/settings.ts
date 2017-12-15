import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

// Providers
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    requests: any;

    constructor(
        private db: AngularFireDatabase,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private userProvider: UserProvider
    ) { }

    addAsFriend(key) {
        let friend = this.db.list(`users/${this.userProvider.id}/friends`);

        friend.set(key, '').then(() => {
            this.db.list(`users/${this.userProvider.id}/requests/`).remove(key);
        });

    }

    ionViewDidLoad() {
        this.requests = this.db.list('users/' + this.userProvider.id + '/requests').snapshotChanges().map(users => {
            return users.filter(user => user.key !== this.userProvider.id).map(user => ({ key: user.payload.key, ...user.payload.val() }));
        });;
    }

}
