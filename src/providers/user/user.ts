import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {
    userId: string = null;
    id: any;
    users = this.db.list('users');

    constructor(private db: AngularFireDatabase) { }

    addNewUser(id: string, moreInfo: any) {
        this.db.list(`users`).update(id, moreInfo);
    }

    setUserId(id: string) {
        this.userId = id;
    }

    addFriendRequest(userId) {
        let user = this.db.list(`users/${userId}/requests`);

        user.set(this.id, '').then();
    }

    get nearbyUsers() {
        return this.users.snapshotChanges();
    }
}
