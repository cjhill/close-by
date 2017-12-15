import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {
    message: string;
    messageGroupId: any;
    messages: any;

    constructor(
        private db: AngularFireDatabase,
        public navCtrl: NavController,
        public navParams: NavParams,
        private userProvider: UserProvider
    ) { }

    sendMessage(message: string) {
        console.log(message);
        this.db.list(`messageGroup/${this.messageGroupId}/messages`).push({
            id: this.userProvider.id,
            message: message
        });
    }

    ionViewDidLoad() {
        this.db.list('messageGroup').push({
            users: {
                one: this.userProvider.id,
                two: this.navParams.get('friendId')
            },
            messages: ''
        }).then(data => {
            this.messageGroupId = data.key;
            this.messages = this.db.list(`messageGroup/${this.messageGroupId}/messages`).snapshotChanges().map(messages => {
                return messages.map(message => ({ key: message.payload.key, ...message.payload.val() }));
            });

            let myGroups = this.db.list(`users/${this.userProvider.id}/messageGroups`);
            let friendGroups = this.db.list(`users/${this.navParams.get('friendId')}/messageGroups`);
            myGroups.set(data.key, '');
            friendGroups.set(data.key, '');
        });
    }

}
