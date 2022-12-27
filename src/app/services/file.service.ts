import { Injectable } from '@angular/core';

import { v4 } from 'uuid';
import { FileElement } from 'src/app/models/element';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getFiles } from '../selectors/selectors';
import { clone } from '../constants/constants';

export interface IFileService {
  queryInFolder(folderId: string): Observable<FileElement[]>;
  pushToPath(path: string, folderName: string);
  popFromPath(path: string);
}

@Injectable()
export class FileService implements IFileService {
  private map = new Map<string, FileElement>();

  constructor(public store: Store<FileElement[]>) {}

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string) {
    const result: FileElement[] = [];
    var files : FileElement[];
    this.store.pipe(select(getFiles()))
    .subscribe(selectedItem => {
      files = selectedItem['reducer']
    });
    files.forEach(element => {
      if (element.parent === folderId) {
        result.push(clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  } 

}