import { FileElement } from './../models/element';
import { createAction, props } from '@ngrx/store';

export const AddFile = createAction('[File Component] AddFile', props<{payload: { fileElement: FileElement }}>());
export const DeleteFile = createAction('[File Component] DeleteFile', props<{payload: { id: string }}>());
export const UpdateFile = createAction('[File Component] UpdateFile', props<{payload: {id: string, update: Partial<FileElement>}}>());
export const AddFileEffect = createAction('[File Component] AddFileEffect', props<{payload: { fileElement: FileElement }}>());
export const DeleteFileEffect = createAction('[File Component] DeleteFileEffect', props<{payload: { id: string }}>());
export const UpdateFileEffect = createAction('[File Component] UpdateFileEffect', props<{payload: {id: string, update: Partial<FileElement>}}>());
