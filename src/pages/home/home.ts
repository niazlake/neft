import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {DatasProvider} from "../../providers/datas/datas";
import {StorageProvider} from "../../providers/storage/storage";

const MAX_LENGTH = 3;
const MAX_LENGTH2 = 4;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  values :any = []

  user1: any = {};
  user2: any = {};
  user3: any = {};
  get_from = []
  showStatement = false;
  validat: any;
  inCheck: any = []
  volume = 0;
  mass = 0;
  @ViewChild('height1') height1;
  @ViewChild('height2') height2;
  @ViewChild('pressure') pressure;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, data: DatasProvider, public storage : StorageProvider) {
    for (var i = 14; i <= 106; i++) {
      this.inCheck.push(i)
      if (i == 25) {
        this.inCheck.push("25a")
      }
      else if (i == 26) {
        this.inCheck.push("26a")
      }
      else if (i == 27) {
        this.inCheck.push("27a")
      }
      else if (i == 35) {
        this.inCheck.push("35a")
      }
      else if (i == 53) {
        this.inCheck.push("53a")
      }
    }

    data.getList().then(value => {
      this.values.push(value)
    })

  }

  ionViewWillEnter() {

  }

  getAll() {
    if (this.validat == null) {
      this.presentToast("Извините, выберите тип! ")
    }
    else {
      if (this.values[0][0][this.validat][this.height1.value] == null || this.values[0][0][this.validat][this.height2.value] == null) {
        this.presentToast("Извините, такой высоты нету! ")
      } else {
        this.volume = (Number(this.values[0][0][this.validat][this.height1.value]) + Number(this.values[0][0][this.validat][this.height2.value])) / 2 * 0.001
        this.mass = this.volume * Number(this.pressure.value)
        this.showStatement = true
        let data = {
          validat : this.validat,
          mass : Math.round(this.mass * 100) / 100,
          volume : Math.round(this.volume*100) /100
        }
        this.storage.addList(data)
      }
    }

  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onChange(carbrand) {
    this.validat = carbrand;
  }
  ionViewWillLeave(){
    this.showStatement = false
  }
}
