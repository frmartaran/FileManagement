import { FileElement } from './../models/element';
import { createReducer, on } from '@ngrx/store';
import { AddFile, DeleteFile, UpdateFile } from './../actions/file-explorer.actions';
import { v4 } from 'uuid';
import { clone } from '../constants/constants';

export const initialState : FileElement[] = [];

const _fileManagerReducer = createReducer(initialState,
  on(AddFile, (state, {payload}) => 
    addFileToState(state, payload.fileElement)
  ),
  on(DeleteFile, (state, {payload}) => 
    deleteFileInState(state, payload.id)
  ),
  on(UpdateFile, (state, {payload}) =>
    updateFileInState(state, payload.id, payload.update)
  )
);

const addFileToState = (state : FileElement[], fileElement: FileElement) => {
    return [...state,
      {
        id : fileElement.id != null
        ? fileElement.id
        :v4(),
        isFolder : fileElement.isFolder,
        name : fileElement.name,
        parent : fileElement.parent
      }
    ]
}

const deleteFileInState = (state: FileElement[], id: string) => {
    var stateToReturn = [...state];
    var index = stateToReturn.findIndex(file => file.id == id);
    if (index > -1) {
      stateToReturn.splice(index, 1);
    }
    return stateToReturn;
}

const updateFileInState = (state: FileElement[], id: string, fileElement: Partial<FileElement>) => {
    let element = clone(state.find(file => file.id == id));
    element = Object.assign(element, fileElement);
    return state.map(file => 
      (file.id == element.id)
      ? element
      : file
    )
}

export function fileManagerReducer(state, action) {
  return _fileManagerReducer(state, action);
}