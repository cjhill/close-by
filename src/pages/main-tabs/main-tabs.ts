import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
    selector: 'page-main-tabs',
    templateUrl: 'main-tabs.html'
})
export class MainTabsPage {

    homeRoot = HomePage;
    listRoot = ListPage;
    profileRoot = ProfilePage;

    constructor(public navCtrl: NavController) {}

}
