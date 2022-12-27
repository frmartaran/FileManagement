import { FileElement } from '../models/element';

export const clone = (element: FileElement) => {
    return JSON.parse(JSON.stringify(element));
}