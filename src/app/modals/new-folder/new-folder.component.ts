import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NewFolderComponent>) {}

  folderName: string;

  ngOnInit() {}
}
