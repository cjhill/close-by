import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MainTabsPage } from '../pages/main-tabs/main-tabs';


// Provider
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { UserProvider } from '../providers/user/user';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyDUhPLEwxBbXwPSR754pe0NcEPNW3_X-7w",
    authDomain: "close-d9c72.firebaseapp.com",
    databaseURL: "https://close-d9c72.firebaseio.com",
    projectId: "close-d9c72",
    storageBucket: "close-d9c72.appspot.com",
    messagingSenderId: "39602789939"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SettingsPage,
        ListPage,
        LoginPage,
        ProfilePage,
        ChatPage,
        MainTabsPage
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        MyApp,
        HomePage,
        SettingsPage,
        ListPage,
        LoginPage,
        ProfilePage,
        ChatPage,
        MainTabsPage
    ],
    providers: [
        Geolocation,
        GeolocationProvider,
        GoogleMaps,
        StatusBar,
        SplashScreen,
        {
            provide: ErrorHandler, 
            useClass: IonicErrorHandler
        },
        UserProvider,
        AuthProvider
    ]
})
export class AppModule {}
