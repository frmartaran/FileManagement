import { FileService } from './services/file.service';
import { Component } from '@angular/core';
import { FileElement } from './models/element';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AddFile, DeleteFile, UpdateFile } from './actions/file-explorer.actions';
import { getFiles } from './selectors/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public fileElements$: Observable<FileElement[]>;

  constructor(public store: Store<FileElement[]>, public fileService : FileService) {
    this.fileElements$ = store.pipe(select(store => store['reducer']));
    this.fileElements$.subscribe(fileElement => console.log(fileElement))
  }

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    const folderA : FileElement = 
    {
      isFolder: true, 
      name: 'Folder A', 
      parent: 'root',
      id: '1'
    };
    var folderB : FileElement =
    {
      isFolder: true,
      name: 'Folder B',
      parent: 'root'
    };
    var folderC : FileElement = 
    {
      isFolder: true,
      name: 'Folder C',
      parent: folderA.id
    };
    var fileA : FileElement = 
    {
      isFolder: false,
      name: 'File A',
      parent: 'root'
    };
    var fileB : FileElement =
    {
      isFolder: false,
      name: 'File B',
      parent: 'root'
    }
    this.store.dispatch(AddFile({payload: {fileElement : folderA}}));
    this.store.dispatch(AddFile({payload: {fileElement : folderB}}));
    this.store.dispatch(AddFile({payload: {fileElement : folderC}}));
    this.store.dispatch(AddFile({payload: {fileElement : fileA}}));
    this.store.dispatch(AddFile({payload: {fileElement : fileB}}));
    this.updateFileElementQuery();
  }

  addFolder(folder: { name: string }) {
    var newFolder : FileElement =
    {
      isFolder: true,
      name: folder.name,
      parent: this.currentRoot 
        ? this.currentRoot.id 
        : 'root'
    }
    this.store.dispatch(AddFile({payload: {fileElement : newFolder}}));
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement) {
    this.store.dispatch(DeleteFile({payload: {id : element.id}}));
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.fileService.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      var files : FileElement[];
      this.store.pipe(select(getFiles()))
      .subscribe(selectedItem => {
        files = selectedItem['reducer']
      });
      this.currentRoot = files.find(file => file.id == this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.fileService.popFromPath(this.currentPath);
  }

  updateFileElementQuery() {
    this.fileElements$ = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }


  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.store.dispatch(UpdateFile({payload: {id : event.element.id, update : { parent: event.moveTo.id }}}));
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    console.log(element);
    this.store.dispatch(UpdateFile({payload: {id : element.id, update : { parent: element.name }}}));
    this.updateFileElementQuery();
  }
}
