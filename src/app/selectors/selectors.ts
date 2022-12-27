import { FileElement } from './../models/element';
import { createSelector } from '@ngrx/store';

export const getFile = (state: FileElement[]) => state;

export const getFiles = () => createSelector(
    getFile,
    (getFile) => getFile
);