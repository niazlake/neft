import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  alldata: any;
  showme = true
  constructor(public navCtrl: NavController, public storage: StorageProvider) {
    storage.getList().then((val) => {
      this.alldata = val
    })
  }

  ionViewWillEnter() {
    if(this.alldata.length == 0){
      this.showme = true
    }
    else {
      this.showme = false
    }
  }
  pushPages(){
    this.navCtrl.push(TabsPage);
  }
}
