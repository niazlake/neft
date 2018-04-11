import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  alldata :any
  constructor(public navCtrl: NavController, public storage: Storage) {
    storage.get("list").then((val)=>{
      this.alldata = val;
    })
  }
  ionViewWillEnter(){
    console.log(this.alldata)
  }

}
