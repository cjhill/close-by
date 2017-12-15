import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

    constructor(
        public afAuth: AngularFireAuth
    ) { }

    login(email: string, pass: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    }

    register(email: string, pass: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    }

    loginWithFacebook() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

}
