import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";


const listStorage = []

export class Chapter {
}


@Injectable()
export class StorageProvider {
  constructor(public allData: Storage) {

  }

  getList(): Promise<Chapter[]> {
    return Promise.resolve(<Chapter[]>listStorage)
  }

  addList(text) {
    listStorage.push(text)
  }
}
